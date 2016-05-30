'use strict';
/**
 * auth was written to manually create the jwt that is passed over to the api.
 * satellite's  $auth  replaces the manual auth service -- but I was not able to get satellite to work on the
 * local-strategy auth/login... so i kept it in place.
 */
angular.module('secureApp').service('auth', function ($state,$http,$window,$q, authToken,API_URL) {
  this.login = function(user){
      var url = API_URL + '/login';
      return $http.post(url, {email:user.email, password:user.password})
        .success( authenticationSuccess);
  };

  this.register=function(user){
      var url = API_URL + '/register';
      return $http.post(url, user).success(authenticationSuccess);
  };

  //manual - should be replaced to use Satellite's login..
  this.googleAuth=function(){
    var clientId='189990944098-glmd1v70437toome0llqp3jkesl7r8jh.apps.googleusercontent.com';
    var redirectUri = $window.location.origin;

    var urlBuilder = [];
    urlBuilder.push('response_type=code', 'client_id='+clientId,
    'redirect_uri='+$window.location.origin,'scope=profile email');

    var url='https://accounts.google.com/o/oauth2/auth?'+urlBuilder.join('&');
    var options='width=500, height=500,left=' + ($window.outerWidth-500)/2 +
        '.top='+ ($window.outerHeight-500)/2.5;

    var defered = $q.defer();
    var popWindow = $window.open(url, '',options);

    $window.focus();

    //puts user's authorization code from google BACK into parent window.
    $window.addEventListener('message', function(e) {
      if(e.origin === $window.location.origin){
        popWindow.close();
        var googleAuthorizationCode = e.data;
        console.log('Put Google authorization code from CHILD -> into PARENT window');

        $http.post(API_URL+'/auth/google',{
          code:googleAuthorizationCode,
          clientId:clientId,
          redirectUri:redirectUri})
          .success(function(jwt){
              authenticationSuccess(jwt);
              defered.resolve(jwt)
          });
      }
    });

    return defered.promise;
  };


  function authenticationSuccess(res) {
    console.log('Authentication Success CB - put jwt into local storage.');
    authToken.setToken(res.token, res.user);
    $state.go('main');
  }

  });

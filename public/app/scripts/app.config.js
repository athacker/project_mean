'use strict';

angular.module('secureApp').config(function($urlRouterProvider,$stateProvider, $httpProvider, $authProvider,  API_URL){
  $urlRouterProvider.otherwise('/');
   $stateProvider.state('main',{
     url:'/',
     templateUrl:'views/main.html'
   }).state('login',{
     url:'/',
     templateUrl:'views/login.html'
   }).state('responsive',{
     url:'/responsive',
     templateUrl:'views/responsive/responsive.html',
     controller:'JobsCtrl'
   }).state('images',{
     url:'/images',
     templateUrl:'views/responsive/images.html',
     controller:'JobsCtrl'
   }).state('jobs',{
     url:'/jobs',
     templateUrl:'views/jobs.html',
     controller:'JobsCtrl'
   }).state('register',{
     url:'/register',
     templateUrl:'views/register.html'
   }).state('logout',{
     url:'/logout',
     controller:'LogoutCtrl'
   });

   $authProvider.baseUrl = API_URL;
   $authProvider.loginUrl = '/auth/login';
   $authProvider.signupUrl ='/auth/signup';
   $authProvider.loginRedirect = '/main';

  //google authorized parameters MUST end with a dash /!! http://localhost:8080/
  $authProvider.google({
    clientId:'189990944098-glmd1v70437toome0llqp3jkesl7r8jh.apps.googleusercontent.com',
    url:API_URL + '/auth/google',
    redirectUri: 'http://localhost:8080'
  });

  $authProvider.facebook({
    clientId:'1699973796934514',
    url:API_URL + '/auth/facebook'
  });


  $httpProvider.interceptors.push('authInterceptor');
})
 // .constant('API_URL','http://www.athacker.ca')
 .constant('API_URL','http://localhost:8080')
.run(function($window){
  var params = $window.location.search.substring(1);
    console.log('1Processing return call back..');
  //break up google return authorization from login pop-up
  if (params && $window.opener && $window.opener.location.origin === $window.location.origin){
    console.log('2Processing return call back..');
      var pair = params.split('=');
      var code = decodeURIComponent(pair[1]);
      $window.opener.postMessage(code, $window.location.origin);
  }



  });

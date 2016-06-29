'use strict';

angular.module('secureApp').controller('LoginCtrl', function ($scope,$state, alert, auth, $auth) {

  //implement this after we get email set up on a server and add in the email verification piece.
  $scope.manual=function(){
    auth.login( $scope.user).success(function(res){
      if ($scope.user.active) {
        alert('success', 'Success Handler', 'Welcome back, ' + res.user.email + '!');
      }else{
        alert('Warning', 'Email Activation Required', 'Welcome back, ' + res.user.email + '! Account has not yet been activated.');
      }
    }).error(function(err){
        alert('warning', 'Not Registered.', 'Please be sure to register before logging in. ' );
        $state.go('register');
    });
  };


  $scope.satellite=function(){
    $auth.login($scope.user)
      .then(function(res){
        alert('success', 'Login Success', 'Welcome back, ' + res.data.user.email + '!');
        $state.go('main');
      }).catch(function(err){
        console.log(JSON.stringify(err));
        alert('warning', 'Login Failure', 'Login in status: ' + err.statusText );
        $state.go('login');
      });
  };


  //satellizer set up -- handles most strategies
  $scope.authenticate=function(provider){
    console.log('Send OAUTH authentication to provider: ' + provider);
    $auth.authenticate(provider).then(function(res){
      alert('success', 'Success Handler', 'Welcome back, ' + res.data.user.displayName + '!');
      $state.go('main');
    }, function(err){
      alert('warning', 'Error Handler', 'Could not get you logged in... ' + err.message);
      $state.go('login');
    });
  }





  //manual set up
    $scope.google=function(){
      console.log('Manually log in to google');
      auth.googleAuth().then(function(res){
           alert('success', 'Success Handler', 'Welcome back, ' + res.user.displayName + '!');
        }, function(err){
          alert('warning', 'Error Handler', 'Could not get you logged in... ' + err.message);
        });
    }

  });

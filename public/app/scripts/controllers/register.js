'use strict';

angular.module('secureApp')  .controller('RegisterCtrl', function ($scope,$auth, $state,  alert, auth ) {

  $scope.submit=function(){

    auth.register($scope.user).success(function(res){
      alert('success', 'Successfully Registered.', 'Welcome, please check your email for verification key. ' + res.user.email + '! Please activate your account ASAP.');
      $state.go('main');
    }).error(function(err){
      alert('warning', 'oops!!', 'Could not get you registered... ' + err);
      $state.go('main');
    });

  };



  $scope.satellizer=function(){
    $auth.signup({email: $scope.user.email, password:$scope.user.password } ).
      then(function(res){
      alert('success', 'Successfully Registered.', 'Welcome, please check your email for verification key. ' + res.data.user.email + '!');
        $state.go('main');
    }).catch(function(err){
      alert('warning', 'oops!!', 'Could not get you registered... ' + err.data);
        $state.go('main');
    });

  };


  });

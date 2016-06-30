'use strict';



angular.module('secureApp').controller('ProfileCtrl',   function ($rootScope, $scope, profileService) {
  console.log(' User - Profile Controller!!');
  $scope.user={};

  $scope.getUser=function(){
    console.log('User Id is: ' + $rootScope.userId);
    $scope.user.id=$rootScope.userId;
    profileService.getUser($rootScope.userId,function(data){
      console.log("Controller ->Get user");
      $scope.user=data;
    });


  };

  $scope.saveProfile=function(){
    console.log("Controller ->Save user");
    $scope.user.id='test';
    profileService.saveUser( $scope.user, function(data){
      //data isn't getting returned back to the controller...
      console.log("Controller ->Save user" + JSON.string(data));
      $scope.user=data;
    });
  };



} );

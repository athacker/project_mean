'use strict';



angular.module('secureApp').controller('ProfileCtrl',   function ($rootScope, $scope, profileService) {
  console.log(' User - Profile Controller!!');
  $scope.user={};

  $scope.getUser=function(){
    console.log('User Id is: ' + $rootScope.userId);
    $scope.user.id=$rootScope.userId;
    profileService.getUser($rootScope.userId).then( function(data){
      $scope.user=data;
    });


  };

  $scope.saveProfile=function(){
    $scope.user.id='test';
    profileService.saveUser( $scope.user).then( function(data){
      $scope.user=data;
    });
  };



} );

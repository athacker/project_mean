'use strict';



angular.module('secureApp').controller('ProfileCtrl',   function ($rootScope, $scope, profileService) {
  console.log(' User - Profile Controller!!');
  $scope.user={};

  $scope.getUser=function(){

    console.log('User Id is: ' + $rootScope.userId);
    $scope.user.id=$rootScope.userId;
    profileService.getUser($rootScope.userId,function(data){
      console.log("Controller ->Get user");
    });
    //profileService.query( function(data){
    //  console.log('Load User Data!');
    //});

  };

  $scope.saveProfile=function(){
    console.log("Controller ->Save user");
    $scope.user.id='test';
    profileService.saveUser( $scope.user, function(data){
      console.log("Controller ->Get user");
    });
    //profileService.post().then(function(data){
    //  console.log('Save User - Profile');
    //});

  };



} );

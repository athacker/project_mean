'use strict';



angular.module('secureApp').controller('ProfileCtrl', function ( $scope, profileService, localStorage) {
  console.log(' User - Profile Controller!!');
  $scope.user={};

  $scope.getUser=function(){
    console.log('User Id is: ' + localStorage.getUserId());
    profileService.getUser(localStorage.getUserId()).then( function(data){
      $scope.user=data;
    });


  };

  $scope.saveProfile=function(){
    profileService.saveUser( $scope.user).then( function(data){
      $scope.user=data;
      localStorage.setUser($scope.user)
      $scope.register.$setPristine();
    });
  };



} );

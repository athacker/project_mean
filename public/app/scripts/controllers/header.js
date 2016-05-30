'use strict';

angular.module('secureApp').controller('HeaderCtrl', function ( $scope,  authToken) {
       $scope.isAuthenticated = function(){
       return authToken.isAuthenticated();
       };

   });

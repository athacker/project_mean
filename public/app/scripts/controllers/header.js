'use strict';

angular.module('secureApp').controller('HeaderCtrl', function ( $rootScope, $scope, localStorage, authToken) {

  $scope.displayName=""
  $rootScope.$on('user_logged_event', function(){
     $scope.displayName = localStorage.getDisplayName();
  });

  $scope.isAuthenticated = function(){
      return authToken.isAuthenticated();
  };

});

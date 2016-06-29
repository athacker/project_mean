'use strict';

angular.module('secureApp').controller('LogoutCtrl', function ($rootScope,$state, alert, authToken) {
  //manual log out
  authToken.removeToken();
  alert('success', 'Success Handler', 'Successfully Logged Off, ' + $rootScope.displayName + '.');
  $rootScope.displayName = null;

  //satellizer logout
  //$auth.logout();
  $state.go('main');

});

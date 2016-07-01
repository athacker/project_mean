'use strict';

angular.module('secureApp').controller('LogoutCtrl', function ($state, alert, authToken, localStorage) {
  //manual log out
  authToken.removeToken();
  alert('success', 'Success Handler', 'Successfully Logged Off.');
  localStorage.clearStorage();

  //satellizer logout
  //$auth.logout();
  $state.go('main');

});

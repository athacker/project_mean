'use strict';

angular.module('secureApp').controller('LogoutCtrl', function ($state, authToken) {
  //manual log out
  authToken.removeToken();

  //satellizer logout
  //$auth.logout();
  $state.go('main');

});

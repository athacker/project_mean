'use strict';

angular.module('secureApp').service('localStorage', function ($rootScope, $window) {

  var storage = $window.localStorage;

  var setUser = function(user){
    if(!user.displayName){
      user.displayName = user.email;
    }
    storage.setItem('displayName', user.displayName);
    storage.setItem('userId', user._id);
    $rootScope.$broadcast('user_logged_event');
 };
  var reload=function(){
    alert("loaded");
  };
  var getDisplayName = function(){
      return storage.getItem('displayName');
  }

  var getUserId = function(){
      return storage.getItem('userId');
  }

  var clearStorage=function(){
    storage.removeItem('userId');
    storage.removeItem('displayName');
  }


  return{
    setUser:setUser,
    getDisplayName:getDisplayName,
    getUserId:getUserId,
    clearStorage:clearStorage,
    reload:reload
  }




});

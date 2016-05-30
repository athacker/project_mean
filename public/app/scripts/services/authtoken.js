'use strict';

angular.module('secureApp').factory('authToken', function ($window  ) {

  var storage = $window.localStorage;
  var cachedToken;
  var userToken = 'satellizer_token'; //local_storage key
  var cachedUser={};
  var user={};
    var authToken = {
      setToken: function (token, user_) {
        cachedToken = token;
        cachedUser = user_;
        storage.setItem( userToken ,token);
        storage.setItem(user, user_);
     },
      getToken:function(){
        if (!cachedToken)
          cachedToken = storage.getItem( userToken );
         return cachedToken;
      },
      isAuthenticated:function(){
        return !!authToken.getToken();
      },
      getUserName:function(){
        if (!cachedUser)
          cachedUser = storage.getItem( user );
        return cachedUser.email;
     },
      removeToken:function(){
        cachedToken = null;
        return storage.removeItem(userToken);
      }
    };

  return authToken;

  });

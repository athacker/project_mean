'use strict';

angular.module('secureApp').factory('authInterceptor', function (authToken) {

    return {
      request: function (config) {
        var token = authToken.getToken();
        console.log("Interceptor->local_storage token  " + token);
        if (token){
          config.headers.Authorization = 'Bearer '+ token;
          console.log("Interceptor-> Local Storage token -> request headers:" + config.headers.Authorization);
        }
        return config;
      },
      respose:function(response){
        return response;
      }
    };
  });

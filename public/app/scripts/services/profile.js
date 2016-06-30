'use strict';


angular.module('secureApp').factory('profileService',['$rootScope','$resource' , function ($rootScope, $resource) {
  /**
   * GET
   * @param userId
   */
  var getUser = function(userId){
    console.log('Service->GetUser...' + userId);
    var restcall = $resource('/api/profile/:id',{id: userId} );
    restcall.get( function(data){
      console.log(data);
      return data;
    });
  };

  /**
   * POST
   * @param user
   */
  var saveUser = function( user){

    var restcall = $resource('/api/profile/'  );
    restcall.save({user:user}, function(data) {
      console.log('Service->Saving User...' +JSON.stringify(data));
      return data;
    });
  };


  return{
    getUser:getUser,
    saveUser:saveUser
  }




}]);

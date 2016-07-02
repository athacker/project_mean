'use strict';


angular.module('secureApp').factory('profileService',['$resource' , function ( $resource) {
  /**
   * GET
   * @param userId
   */
  var getUser = function(userId){
    var profile = $resource('/api/profile/:id'  );
    return profile.get({id:userId}).$promise.then(function (data) {
      console.log('Service->GET User...' +JSON.stringify(data));
      return data
    });
  };

  /**
   * POST
   * @param user
   */
  var saveUser = function( user){
    var profile = $resource('/api/profile/'  );
    return profile.save({user:user}).$promise.then(function (data) {
      console.log('Service->POST User...' +JSON.stringify(data));
      return data
    });
   };


  return{
    getUser:getUser,
    saveUser:saveUser
  }




}]);

'use strict';


angular.module('secureApp').factory('profileService',['$rootScope','$resource' , function ($rootScope, $resource) {


  //return $resource('/api/profile/:id',{},
  //  {
  //    query: {
  //      method: 'GET',
  //      params:{id:id},
  //      isArray:true
  //    },
  //    post:{method: 'POST'}
  //  });


  var getUser = function(userId){


    console.log('Service->GetUser...' + userId);



    var restcall = $resource('/api/profile/:id',{id: userId} );
    return restcall.query();

    //var user = User.get({userId:123}, function() {
    //  user.abc = true;
    //  user.$save();
    //});



  };

  var saveUser = function( user){
    console.log('Service->Saving User...' +JSON.stringify(user));
    var restcall = $resource('/api/profile/'  );
    restcall.save({user:user}, function(data) {
      console.log("SAVED");
    });
  };


  return{
    getUser:getUser,
    saveUser:saveUser
  }




}]);

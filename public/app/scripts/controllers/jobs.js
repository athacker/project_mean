'use strict';



angular.module('secureApp').controller('JobsCtrl', function ( $scope, $state, $http, API_URL, alert, jobs) {
    $scope.jobs = jobs;
    console.log($state.current.data);


    //put this into a service
    //$http.get(API_URL + '/jobs').success(function(data){
    //  $scope.jobs = data;
    //}).error(function(err){
    //  console.log(err.message);
    //  alert('warning','No Jobs!!', err.message);
    //});



  });

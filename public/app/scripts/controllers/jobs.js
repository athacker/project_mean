'use strict';

angular.module('secureApp').controller('JobsCtrl', function ($scope, $http,API_URL, alert) {
    $scope.jobs = [];

    $http.get(API_URL + '/jobs').success(function(data){
      $scope.jobs = data;
    }).error(function(err){
      console.log(err.message);
      alert('warning','No Jobs!!', err.message);
    });



  });

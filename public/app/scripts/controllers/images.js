'use strict';


angular.module('secureApp').controller('ImagesCtrl', function ($scope, $timeout, $anchorScroll) {


$scope.scrollTo = function(id){
  $timeout(function() {
    $anchorScroll(id);

  }, 1000);

 };


});

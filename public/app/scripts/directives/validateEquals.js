'use strict';

/**
 * @ngdoc directive
 * @name secureApp.directive:sameAs
 * @description
 * # sameAs
 */
angular.module('secureApp')
  .directive('validateEquals', function () {
    return {
      require: 'ngModel',
      link:function(scope,element, attr, ngModelCtlr){

        function validateEqual(value){
          var isValid = (value===scope.$eval(attr.validateEquals));
          ngModelCtlr.$setValidity('equal',isValid);
          return isValid ? value: undefined;
        }

        ngModelCtlr.$parsers.push(validateEqual);
        ngModelCtlr.$formatters.push(validateEqual);

        scope.$watch(attr.validateEquals,function(){
          ngModelCtlr.$setViewValue(ngModelCtlr.$viewValue);
        });

      }
    };
  });

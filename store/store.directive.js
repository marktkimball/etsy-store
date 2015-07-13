(function() {
  'use strict';
  angular
    .module('store')
    .directive('productItem', function(){
      return{
        restrict: 'E',
        templateUrl: 'store/views/storeItem.html',
        scope: {
          i: '='
        }
      }
    })
})();

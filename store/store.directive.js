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
        },
        link: function(scope, element, attributes){
          element.on('mouseenter', function(){
            element.addClass('dropShadow');
          });
          element.on('mouseleave', function(){
            element.removeClass('dropShadow');
          });
        }
      }
    })
})();

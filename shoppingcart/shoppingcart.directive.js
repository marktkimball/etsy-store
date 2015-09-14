(function() {
  'use strict';
  angular
    .module('store')
    .directive('shoppingCartItem', function(){
      return{
        restrict: 'E',
        templateUrl: 'shoppingcart/views/shoppingCartItem.html',
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

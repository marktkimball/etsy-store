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
          element.children().on('mouseenter', function(){
            element.children().addClass('dropShadow');
          });
          element.children().on('mouseleave', function(){
            element.children().removeClass('dropShadow');
          });
        }
      }
    })
})();

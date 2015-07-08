(function() {
  'use strict';
  angular
    .module('shoppingcart')
    .controller('ShoppingCartController', function($scope, _, ShoppingCartService, $location){

        ShoppingCartService.getCart().then(function(items){
          $scope.items = items;
        })

      $scope.orderTotalPrice = function(items){
        var total = 0;
        _.each(items, function(el){
          total += Number(el.price);
        });
        return total;
      }

      $scope.addToCart = function(item){
        ShoppingCartService.addToCart(item);
      }

      $scope.removeFromCart = function(id){
        ShoppingCartService.removeFromCart(id);
      }

      var watchCallback = function () {
          ShoppingCartService.getCart().then(function (items) {
            $scope.items = items;
          });
        };

      $scope.$on('item:deleted', watchCallback);
      $scope.$on('item:created', watchCallback);
    });

})();

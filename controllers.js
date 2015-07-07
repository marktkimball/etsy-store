(function() {
  'use strict';

  angular
    .module('etsyStore')
    .controller('MainController', function($scope, StoreService, $routeParams){
      StoreService.getItems().then(function(items){
        $scope.items = items;
      })

      StoreService.getItem($routeParams.productId).then(function(item){
        $scope.item = item;
      })

    })

    .controller('ShoppingCartController', function($scope, ShoppingCartService){
      ShoppingCartService.getCart().then(function(items){
        $scope.items = items;
      })

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
    })
})();

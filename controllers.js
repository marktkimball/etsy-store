(function() {
  'use strict';

  angular
    .module('etsyStore')
    .controller('MainController', function($scope, StoreService, $routeParams, $rootScope){
      StoreService.getItems().then(function(items){
        $scope.items = items;
      })

      StoreService.getItem($routeParams.productId).then(function(item){
        $scope.item = item;
      })

      $scope.sortName = 'id';

      this.selectSort = function(sortSelected){
        $scope.sortName = sortSelected;
        $rootScope.$broadcast('sorter:updated');
      }

      var watchCallback = function () {
        StoreService.getItems().then(function (items) {
          $scope.items = items;
        })
      };

      $scope.$on('sorter:updated', watchCallback);

    })

    .controller('ShoppingCartController', function($scope, _, ShoppingCartService){
      ShoppingCartService.getCart().then(function(items){
        $scope.items = items;

        $scope.orderTotalPrice = function(items){
          var total = 0;
          _.each(items, function(el){
            total += Number(el.price);
          });
          return total;
        }
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

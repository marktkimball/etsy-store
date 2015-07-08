(function() {
  'use strict';

  angular
    .module('etsyStore')
    .controller('MainController', function($scope, StoreService, $routeParams, $rootScope){
      StoreService.getItems().then(function(items){
        console.log(items);
        $scope.items = items;
      })

      StoreService.getItem($routeParams.productId).then(function(item){
        $scope.item = item;
      })

      $scope.filterNumber = 'id';

      this.selectFilter = function(filterSelected){
        $scope.filterNumber = filterSelected;
        $rootScope.$broadcast('filter:updated');
      }

      var watchCallback = function () {
        StoreService.getItems().then(function (items) {
          $scope.items = items;
        })
      };

      $scope.$on('filter:updated', watchCallback);

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

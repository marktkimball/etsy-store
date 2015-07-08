(function() {
  'use strict';
  angular
    .module('store')
    .controller('StoreController', function($scope, StoreService, $routeParams, $rootScope){

      StoreService.getItems().then(function(items){
        $scope.items = items;
      })

      if($routeParams.productId){
        StoreService.getItem($routeParams.productId).then(function(item){
          $scope.item = item;
        })
      }

      $scope.sortName = 'id';

      $scope.selectSort = function(sortSelected){
        $scope.sortName = sortSelected;
        $rootScope.$broadcast('sorter:updated');
      }

      var watchCallback = function () {
        StoreService.getItems().then(function (items) {
          $scope.items = items;
        })
      };

      $scope.$on('sorter:updated', watchCallback);

    });
})();

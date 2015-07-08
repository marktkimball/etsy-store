(function() {
  'use strict';
  angular
    .module('store', [
      'ngRoute'
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'store/views/main.html',
          controller: 'StoreController'
        })
        .when('/detail/:productId', {
          templateUrl: 'store/views/detailView.html',
          controller: 'StoreController'
        })
    })
})();

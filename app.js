(function() {
  'use strict';

  angular
    .module('etsyStore', [
      'ngRoute',
      'underscore'
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainController'
        })
        .when('/detail/:productId', {
          templateUrl: 'views/detailView.html',
          controller: 'MainController'
        })
        .when('/shoppingcart', {
          templateUrl: 'views/shoppingCart.html',
          controller: 'ShoppingCartController'
        })
        .when('/404', {
          template: '<h1>Page Not Found</h1>'
        })
        .otherwise({
          redirectTo: '/404'
        });
    });

  angular
    .module('underscore', [])
    .factory('_', function($window){
      return $window._;
    });
})();

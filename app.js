(function() {
  'use strict';

  angular
    .module('etsyStore', [
      'ngRoute',
      'underscore',
      'shoppingcart',
      'store'
    ])
    .config(function($routeProvider){
      $routeProvider
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

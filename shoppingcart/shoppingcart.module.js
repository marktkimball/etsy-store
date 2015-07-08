(function() {
  'use strict';
  angular
    .module('shoppingcart', [
      'ngRoute'
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/shoppingcart', {
          templateUrl: 'shoppingcart/views/shoppingCart.html',
          controller: 'ShoppingCartController'
        })
    })

})();

(function() {
  'use strict';
  angular
    .module('shoppingcart')
    .factory('ShoppingCartService', function($http, $rootScope){
      var cartUrl = "https://stormy-ocean-9523.herokuapp.com/collections/etsy-cart";

      var getCart = function(){
        return $http.get(cartUrl).then(function(items){
          var cartArray = items.data;
          return cartArray;
        })
      };

      var addToCart = function(item){
        $http.post(cartUrl, item).success(function(response){
          $rootScope.$broadcast('item:created');
        }).error(function(error){
          console.log("error " + error);
        })
      }

      var removeFromCart = function(id){
        $http.delete(cartUrl + "/" + id).success(function(response){
          $rootScope.$broadcast('item:deleted');
        }).error(function(error){
          console.log("error " + error);
        })
      }

      return{
        getCart: getCart,
        addToCart: addToCart,
        removeFromCart: removeFromCart
      };
    });


})();

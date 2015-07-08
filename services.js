(function() {
  'use strict';

  angular
    .module('etsyStore')
    .factory('StoreService', function($http, _, $q, $cacheFactory){

      var cacheCreator = $cacheFactory('CacheCreator');

      var urlOptions = {
        baseUrl: 'https://openapi.etsy.com/v2/listings/active.js?includes=MainImage&keywords=running&api_key=',
        apiKey: 'bvkb5zmhkonrbcizks9cqeh1',
        callback: '&callback=JSON_CALLBACK',
        buildUrl: function(){
          return this.baseUrl + this.apiKey + this.callback;
        }
      };

      var mapData = function(dataArray){
        return _.map(dataArray, function(obj){
          return {tinyImg: obj.MainImage.url_75x75, smallImg: obj.MainImage.url_170x135, largeImg: obj.MainImage.url_570xN, title: obj.title, etsyUrl: obj.url, description: obj.description, price: Number(obj.price), materials: obj.materials, id: obj.listing_id}
        })
      };

      var getItems = function(){
        var deferred = $q.defer();
        var cache = cacheCreator.get('items');
        if(cache){
          deferred.resolve(cache);
        }else{
          $http.jsonp(urlOptions.buildUrl()).then(function(items){
            var itemsArray = items.data.results;
            cacheCreator.put('items', mapData(itemsArray));
            deferred.resolve(mapData(itemsArray));
          })
        }
        return deferred.promise;
      };

      var getItem = function(id){
        var deferred = $q.defer();
        var cache = cacheCreator.get('items');
        if(cache){
          deferred.resolve(_.where(cache, {id: Number(id)})[0]);
        }else{
          $http.jsonp(urlOptions.buildUrl()).then(function(items){
            var individualItem = _.where(items.data.results, {listing_id: Number(id)});
            deferred.resolve(mapData(individualItem)[0]);
          })
        }
        return deferred.promise;
      }

      return {
        getItems : getItems,
        getItem: getItem
      };
    })


    .factory('ShoppingCartService', function($http, $rootScope){
      var cartUrl = "http://tiy-fee-rest.herokuapp.com/collections/mark-etsy-cart";

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
    })

})();

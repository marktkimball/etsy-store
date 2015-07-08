(function() {
  'use strict';
  angular
    .module('store')
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
          return {tinyImg: obj.MainImage.url_75x75, smallImg: obj.MainImage.url_170x135, largeImg: obj.MainImage.url_570xN, title: cleanCharacters(obj.title), etsyUrl: obj.url, description: cleanCharacters(obj.description), price: Number(obj.price), materials: obj.materials, id: obj.listing_id}
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

      var cleanCharacters = function(html) {
       var text = document.createElement("textarea");
       text.innerHTML = html;
       return text.value;
};

      return {
        getItems : getItems,
        getItem: getItem
      };
    });
})();

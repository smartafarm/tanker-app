// FACTORY FOR DATA
var tankerapp = angular.module('tankerapp');
tankerapp
.factory('dfo',['$http','$q', function($http,$q){
//Factory to recevie user device data and readings based on user
return{

  getMethod:function(api){
            var deferred = $q.defer();
            $http({
             //url:'http://localhost/tankerApi/'+ api,
             url:'http://52.62.42.42/api/'+api,              
                method:'GET'
            }).then(function(response){
                deferred.resolve(response.data)
            },function(reject){
                deferred.reject(reject);
            });
            return deferred.promise
        },
  postMethod : function(api,text){
    
  var deferred = $q.defer();      
  $http({
    
    //url:'http://localhost/tankerApi/'+ api,
    url:'http://52.62.42.42/api/'+ api,    
    headers: { 'Content-Type': 'text/html' },
    method:'POST',
    data:({'query' : text})
  }).then(function(response){
    deferred.resolve(response);
  },function(response){       
    deferred.reject("Failed");
  });
  return deferred.promise;
  }
          
 }  
}]);// eof getdevices
var tankerapp = angular.module('tankerapp');
tankerapp
// Main Application Controller
.controller('appCtrl', function($scope,$http,dfo,$mdSidenav) {
 

  dfo.getMethod('dpu/fetch').then(function(data){
    $scope.data = data
  })
$scope.postData = function(){
	
	dfo.postMethod('tloc/push',$scope.pushtext)
}      

});

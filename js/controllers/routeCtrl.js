var tankerapp = angular.module('tankerapp');
tankerapp
// Main Application Controller
.controller('routeCtrl', function($scope,$state) {
 
	$state.go('dashboard.route.start');
  

})

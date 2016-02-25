var tankerapp = angular.module('tankerapp');
tankerapp
.controller('labrCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,Upload) {	
  // server path
  $scope.path  = 'http://52.62.42.42/api/'
  dfo.getMethod('labr/fetchall').then(function(response){    
    data = response
    $scope.downloads = [];
    data.forEach(function(value,key){
      
      $scope.downloads.push(value);  
    })
    console.log($scope.downloads);
  })
	$scope.onFileSelect = function(file) {		
    if (!file) return;
    Upload.upload({
        url: 'http://52.62.42.42/api/labr/upload',
        data: {file: file, username: $scope.username}
      }).then(function(response) {
        // file is uploaded successfully
        console.log(response);
        $scope.downloads.push(response.data); 
      });    
  	};
});


var tankerapp = angular.module('tankerapp');
tankerapp
.controller('tlocCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification) {	
dfo.getMethod ('tloc/fetchall').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  		

    $scope.myData.push(
    	{
		  "id" : value._id.$id,
	      "did" : value.did,
	      "dt" : value.dt,
	      "lat" : value.lat,
	      "long" : value.long       
	      
	    })
	})
})


$scope.dropdownToggle = false;	
$scope.formdata = {};
$scope.formdata.time=new Date();
$scope.onTimeSet = function (newDate, oldDate) {
 $scope.dropdownToggle = false;
}
$scope.ok = function(){
	
	var string = '##' + 
	$scope.formdata.did + ',' +
	//$scope.formdata.time.toISOString() + ',' +
	moment($scope.formdata.time).format("YYYYMMDDTHHmmss") + 'Z,' +
	$scope.formdata.lat + ',' +
	$scope.formdata.long + ',' 	
	string = string + 'return,*'

	dfo.postMethod('tloc/push',string).then(function(response){
	
		if(response.status == 200){			
			 $scope.myData.push(
			    	{
					  "id" : response.data.$id,
				      "did" : $scope.formdata.did,
				      "dt" : moment($scope.formdata.time).format("YYYY-MM-DD HH:mm:ss"),
				      "lat" : $scope.formdata.lat,
				      "long" : $scope.formdata.long 
				     
				      
				    }
				    )
			 Notification.success({message : 'Record Added' ,delay : 3000})
			$scope.formdata = {};
			$scope.formdata.time=new Date();
		}
	})

	//console.log(moment($scope.formdata.time).format("YYYY-MM-DD HH:mm:ss"));
}

 $scope.gridOptions = {	    
   data: 'myData',
   enableGridMenu: true,
   enableRowSelection: true,		    
   selectionRowHeaderWidth: 35,
   rowHeight: 35,
   rowWidth : 20,
   enableColumnResizing : true,
   paginationPageSizes: [10, 20, 30],
   paginationPageSize: 10,
   columnDefs:[
   { field: 'did' ,displayName:'Device' ,enableCellEdit : false},
   { field: 'dt',displayName:'dt' ,enableCellEdit : false,width : 160 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'lat',displayName:'lat' }	,
   { field: 'long',displayName:'long' }	
    
   ]
  
   
   
 }
 $scope.gridOptions.onRegisterApi = function(gridApi) {
  //set gridApi on scope
  $scope.gridApi = gridApi;
  gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
    //Do your REST call here via $http.get or $http.post

    //Alert to show what info about the edit is available
    if(newValue != oldValue){
    	var data = {};
	    data.id  = rowEntity.id ;
	    data.change = colDef.field;
	    data.value = newValue;	    
	  
    	dfo.postMethod('tloc/update',data).then(function(response){
    		if(response.data == 1){
    			Notification.success({message : 'Update Succcessful' ,delay : 3000})
    		}else{
    			Notification.error({message : 'Updated Failed. Please try again' ,delay : 3000})
    		}
    	})

    }
   
 
  });
};
 

});

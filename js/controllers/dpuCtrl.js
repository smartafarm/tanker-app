var tankerapp = angular.module('tankerapp');
tankerapp
.controller('dpuCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification) {	
dfo.getMethod ('dpu/fetchdpu').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  		

    $scope.myData.push(
    	{
		  "id" : value._id.$id,
	      "did" : value.did,
	      "dt" : value.dt,
	      "lat" : value.lat,
	      "long" : value.long ,
	      "route" :value.route,
	      "supplier":value.supplier,
	      "vol":parseFloat(value.vol)/10,
	      "tmax":parseFloat(value.tmax)/10,
	      "tavg":parseFloat(value.tavg)/10,
	      "tmin":parseFloat(value.tmin)/10
	      
	    })
    
	})
})


	
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
	$scope.formdata.long + ',' +
	$scope.formdata.supplier + ',' +
	$scope.formdata.route + ',' +
	parseFloat($scope.formdata.tavg*10) + ',' +
	$scope.formdata.tmin*10 + ',' +
	$scope.formdata.tmax*10 + ',' +
	$scope.formdata.vol*10 + ',' 
	string = string + 'return,*'

	dfo.postMethod('dpu/push',string).then(function(response){		
		if(response.status == 200){			
			 $scope.myData.push(
			    	{
					  "id" : response.data.$id,
				      "did" : $scope.formdata.did,
				      "dt" : moment($scope.formdata.time).format("YYYY-MM-DD HH:mm:ss"),
				      "lat" : $scope.formdata.lat,
				      "long" : $scope.formdata.long ,
				      "route" :$scope.formdata.route,
				      "supplier":$scope.formdata.supplier,
				      "vol":parseFloat($scope.formdata.vol),
				      "tmax":parseFloat($scope.formdata.tmax),
				      "tavg":parseFloat($scope.formdata.tavg),
				      "tmin":parseFloat($scope.formdata.tmin)
				      
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
   { field: 'dt',displayName:'Date' ,enableCellEdit : false,width : 160 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'lat',displayName:'Lat' }	,
   { field: 'long',displayName:'Long' }	,
   { field: 'route',displayName:'Route' }	,
   { field: 'supplier',displayName:'Supplier' }	,
   { field: 'tavg',displayName:'Temp Avg' }	,
   { field: 'tmin',displayName:'Temp Min' }	,
   { field: 'tmax',displayName:'Temp Max' }	,
   { field: 'vol',displayName:'Volume' }	   
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
	    // multiplying 10 if numerical value is changed
	    if(['tavg','tmin','tmax','vol'].indexOf(data.change) != -1  ){
	    	data.value = parseFloat(newValue) *10;	    	
	    }else
	    {
	    	data.value = newValue;	    
	    }
    	dfo.postMethod('dpu/update',data).then(function(response){
    		if(response.data == 1){
    			Notification.success({message : 'Update Succcessful' ,delay : 3000})
    		}else{
    			Notification.error({message : 'Updated Failed. Please try again' ,delay : 3000})
    		}
    	})

    }
   
   /* console.log(rowEntity);
    console.log(colDef);
    console.log(newValue);
    console.log(oldValue);*/
  });
};
 

});

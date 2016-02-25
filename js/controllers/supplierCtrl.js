var tankerapp = angular.module('tankerapp');
tankerapp
.controller('supplierCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification) {	
dfo.getMethod ('supplier/fetchall').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  		

    $scope.myData.push(
    	{
		  "id" : value._id.$id,
	      "did" : value.did,	      
	      "supID" : value.supID,
	      "pid" : value.pid ,
	      "pname" :value.pname,
	      "supno":value.supno,
	      "supname":value.supname,
	      "lat" : value.lat,
	      "long" : value.long ,
	      "expqty":parseFloat(value.expqty)/10
	      
	    })
    
	})
})

$scope.formdata = {};		
$scope.panelstatus = false;
$scope.ok = function(){
	var string = '##' + 
	$scope.formdata.did + ',' +
	$scope.formdata.supID + ',' +
	$scope.formdata.pid + ',' +
	$scope.formdata.pname + ',' +
	$scope.formdata.supno + ',' +
	$scope.formdata.supname + ',' +
	$scope.formdata.lat + ',' +
	$scope.formdata.long + ',' +	
	$scope.formdata.expqty*10 + ',' 
	string = string + 'return,*'

	dfo.postMethod('supplier/push',string).then(function(response){		
		if(response.status == 200){			
			 $scope.myData.push(
			    	{
					  "id" : response.data.$id,					  
				      "did" : $scope.formdata.did,	      
				      "supID" : $scope.formdata.supID,
				      "pid" : $scope.formdata.pid ,
				      "pname" :$scope.formdata.pname,
				      "supno":$scope.formdata.supno,
				      "supname":$scope.formdata.supname,
				      "lat" : $scope.formdata.lat,
				      "long" : $scope.formdata.long ,
				      "expqty":parseFloat($scope.formdata.expqty)			      
				      
				    }
				    )
			Notification.success({message : 'Record Added' ,delay : 3000}) 
			$scope.panelstatus = false;	
			$scope.formdata = {};	

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
   { field: 'supID',displayName:'Supp ID' }	,
   { field: 'pid',displayName:'Processor ID' }	,
   { field: 'pname',displayName:'Processor Name' }	,
   { field: 'supno',displayName:'Supp #' }	,
   { field: 'supname',displayName:'Supp Name' }	,
   { field: 'lat',displayName:'Lat' }	,
   { field: 'long',displayName:'Long' }	,
   { field: 'expqty',displayName:'QTY' }	   
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
	    if(['expqty'].indexOf(data.change) != -1  ){
	    	data.value = parseFloat(newValue) *10;	    	
	    }else
	    {
	    	data.value = newValue;	    
	    }
    	dfo.postMethod('supplier/update',data).then(function(response){
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

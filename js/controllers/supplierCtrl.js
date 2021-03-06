var tankerapp = angular.module('tankerapp');
tankerapp
.controller('supplierCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	

if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
   	$rootScope.alldevices = devices;
   })	
}

dfo.getMethod ('supplier/fetchall').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  	


    $scope.myData.push(
    	{
	      "id" : value._id.$id,
	      "tankid" : value.tankid,
	      "truckid" : value.truckid,
	     	      
	      "supID" : value.supID,
	      "pid" : value.pid ,
	      "pref":value.pref,
	      "supname":value.supname,
	      "street":value.street,
	      "city":value.city,
	      "lat" : value.lat,
	      "long" : value.long ,
	       "zone" : value.zone ,
	      "expqty":parseFloat(value.expqty)/10
	      
	    })
    
	})
})

$scope.formdata = {};		
$scope.panelstatus = false;
$scope.ok = function(){
	var string = '##' + 
	
	$scope.formdata.supID + ',' +
	$scope.formdata.pid + ',' +
	
	$scope.formdata.pref + ',' +
	$scope.formdata.supname + ',' +
	$scope.formdata.street + ',' +
	$scope.formdata.city + ',' +
	$scope.formdata.lat + ',' +
	$scope.formdata.long + ',' +	
	$scope.formdata.zone + ',' +
	$scope.formdata.expqty*10 + ',' 
	string = string + 'return,*'

	dfo.postMethod('supplier/push',string).then(function(response){		
		if(response.status == 200){			
				
			 $scope.myData.push(
			    	{
				     "id" : response.data.$id,
				      
				      "tankid" : $scope.formdata.tankid,
      				      "truckid" : $scope.formdata.truckid,      
				      "supID" : $scope.formdata.supID,
				      "pid" : $scope.formdata.pid ,
				      "pref":$scope.formdata.pref,
				      "supname":$scope.formdata.supname,
				      "street":$scope.formdata.street,
				      "city":$scope.formdata.city,
				      "lat" : $scope.formdata.lat,
				      "long" : $scope.formdata.long ,
				      "zone" : $scope.formdata.zone ,
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
   { field: 'supID',displayName:'Supp ID' }	,
   { field: 'pid',displayName:'Processor ID' }	,
   { field: 'pref',displayName:'Processor #' }	,
   { field: 'supname',displayName:'Supp Name' }	,
    { field: 'street',displayName:'Street' }	,
   { field: 'city',displayName:'City' }	,
   { field: 'lat',displayName:'Lat' }	,
   { field: 'long',displayName:'Long' }	,
   { field: 'zone',displayName:'Zone' }	,
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
$scope.delete= function(){
	if( $scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please select a record ', delay: 3000});
				}else{

					var selection = $scope.gridApi.selection.getSelectedRows();

					var data ={}; 
					data.id = selection[0] .id;

					dfo.postMethod('supplier/delete' , data).then(function(response){
						if(response.data == 1){
				    			Notification.success({message : 'Record Deleted' ,delay : 3000});
		    			//remove from grid
				   	angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
					        $scope.myData.splice($scope.myData.lastIndexOf(data), 1);
					      });

				    		}else{
				    			Notification.error({message : 'Delete Failed. Please try again' ,delay : 3000})
				    		}
					})


				}
			}

});

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('routedataCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	

if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
   	$rootScope.alldevices = devices;
   })	
}

dfo.getMethod ('route/fetchalldata').then(function(response){
   var data = response;       

   $scope.myData = [];        
   
   data.forEach(function(value,key){  	
	   value.tankid ="Not found"
	   value.truckid = "Not Found"
	angular.forEach($rootScope.alldevices,function(myvalue,mykey){
		if(myvalue.did == value.did){
			value.tankid = myvalue.tankid
			value.truckid = myvalue.truckid
		}	
	})


    $scope.myData.push(
    	{
	      "id" : value._id.$id,
	      "tankid" : value.tankid,
	      "truckid" : value.truckid,
	      "did" : value.did,
	      "dt" : moment(value.dt).format('DD-MM-YYYY'),
	      "routeid" : value.routeid,
	      "pid":value.pid,
	      "destID":value.destID,
	      "supplier":value.supplier,
	      "suppliercrn":value.suppliercrn,
	     
	      
	      
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
	$scope.formdata.routeid + ',' +
	$scope.formdata.pid + ',' +
	$scope.formdata.destID + ',' +
	$scope.formdata.supplier + ',' +
	$scope.formdata.suppliercrn+ ',' 
	
	string = string + 'return,*'

	dfo.postMethod('route/pushdata',string).then(function(response){		
		if(response.status == 200){	
			$scope.formdata.tankid ="Not found"
		   	$scope.formdata.truckid = "Not Found"
			angular.forEach($rootScope.alldevices,function(myvalue,mykey){
				if(myvalue.did == $scope.formdata.did){
					$scope.formdata.tankid = myvalue.tankid
					$scope.formdata.truckid = myvalue.truckid
				}
				})		
			 $scope.myData.push(
			    	{
				     "id" : response.data.$id,
				      "did" : $scope.formdata.did,
				      "tankid" : $scope.formdata.tankid,
      				      "truckid" : $scope.formdata.truckid,
				      "dt" : moment($scope.formdata.time).format("DD-MM-YYYY"),
			     		"routeid" : $scope.formdata.routeid,
				      "pid":$scope.formdata.pid,
				      "destID":$scope.formdata.destID,
				      "supplier":$scope.formdata.supplier,
				      "suppliercrn":$scope.formdata.suppliercrn
				      
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
   multiSelect: false,
   enableColumnResizing : true,
   paginationPageSizes: [10, 20, 30],
   paginationPageSize: 10,
   columnDefs:[
   { field: 'did' ,displayName:'Device' ,enableCellEdit : false},
   { field: 'tankid' ,displayName:'Tank ID' ,enableCellEdit : false},
   { field: 'truckid' ,displayName:'Truck ID' ,enableCellEdit : false},
   { field: 'dt',displayName:'Date' ,enableCellEdit : false,width : 120 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'routeid',displayName:'Route ID' }	,
   { field: 'pid',displayName:'Processor ID' }	,
   { field: 'destID',displayName:'Destination ID' }	,
   { field: 'supplier',displayName:'Supplier' }	,
   { field: 'suppliercrn',displayName:'Supplier CRN' }	
   
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
    	dfo.postMethod('route/updatedata',data).then(function(response){
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

					dfo.postMethod('route/deletedata' , data).then(function(response){
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

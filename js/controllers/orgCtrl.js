var tankerapp = angular.module('tankerapp');
tankerapp
.controller('orgCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	


if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
   	$rootScope.alldevices = devices;
   })	
}

dfo.getMethod ('org/fetchall').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  	
	   

    $scope.myData.push(
    	{
	      "id" : value._id.$id,
	      "orgName" : value.orgName,
	      "street" : value.street,
	      "city" : value.city,   
	      
	    })
    
	})
})

$scope.formdata = {};		
$scope.panelstatus = false;
$scope.ok = function(){
	var string = '##' + 
	$scope.formdata.orgName + ',' +
	$scope.formdata.street + ',' +
	$scope.formdata.city + ',' 	
	string = string + 'return,*'

	dfo.postMethod('org/push',string).then(function(response){		
		if(response.status == 200){			
		
			 $scope.myData.push(
			    	{
				     "id" : response.data.$id,
				     "orgName" :  $scope.formdata.orgName,
	      				"street" :  $scope.formdata.street,
				      "city" : $scope.formdata.city

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
   { field: 'orgName' ,displayName:'Name' ,enableCellEdit : false},  
   { field: 'street' ,displayName:'Street' ,enableCellEdit : false},
   { field: 'city' ,displayName:'City' ,enableCellEdit : false}
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
    	dfo.postMethod('org/update',data).then(function(response){
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

					dfo.postMethod('org/delete' , data).then(function(response){
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

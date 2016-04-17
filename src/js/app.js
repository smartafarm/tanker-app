var tankerapp = angular.module('tankerapp', 
  [
  'ui.router',
  'ngMaterial',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'ui.grid',
  'ui.grid.selection',
  'ui.grid.resizeColumns',
  'ui.grid.pagination',
  'ui.grid.edit',
  'ui-notification',
  'ngFileUpload'
  ]
);



/*//Main application Javascript
var tankerapp = angular
.module('tankerapp', [
  //dependencies
'ui.router',
'ui.bootstrap',
'cgNotify',
'ngAnimate',
'oc.lazyLoad',
'ui.grid',
'ui.grid.selection',
'ui-notification',
'ui.grid.resizeColumns',
'ui.grid.pagination',


])

//pushing request interceptor for server
.config(function($httpProvider) {  
  $httpProvider.interceptors.push('reqInspect');
})

//configuartion to animate accordion for UIB ANGULAR BOOTSTRAP
.config(['$animateProvider', function($animateProvider) {
      
      $animateProvider.classNameFilter(/^((?!(ui-grid-menu)).)*$/);
  }
])
*/

angular.module('tankerapp')
.config(function($mdDateLocaleProvider) {

	//Formatting Date in Ng-Material Date Picker
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD-MM-YYYY');
    };
});
//APPLICATION ROUTING SCRIPT
var tankerapp =angular.module('tankerapp');
tankerapp
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/dashboard/dailypickup');

        // Application routes
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller : 'LoginCtrl'
              
            })           
            .state('dashboard', {
                url:'/dashboard',                     
                controller: "appCtrl",                
                views:{
                    '' : {
                         templateUrl: 'partials/dashboard.html'
                    },
                    "nav@dashboard" : {
                        templateUrl: 'partials/nav.html'   
                    },
                    
                }              
            })

            .state('dashboard.viewdata', {
                url: '/viewdata',
                views:{
                    "contentview":{
                        templateUrl: 'partials/view-data.html'  
                                            
                    }
                }
            })

            .state('dashboard.dpu', {
                url: '/dailypickup',                
                views:{
                    "contentview":{
                        templateUrl: 'partials/dpu.html'  ,
                        controller: 'dpuCtrl',                        
                    }
                }                
                
                
            })  

            .state('dashboard.cip', {
                url: '/cip',
                views:{
                    "contentview":{
                        templateUrl: 'partials/cip.html'  ,
                        controller : 'cipCtrl'
                                            
                    }
                }                
                
                
            })

            .state('dashboard.tloc', {
                url: '/tankerlocation',
                views:{
                    "contentview":{
                        templateUrl: 'partials/tloc.html',
                        controller: 'tlocCtrl'  
                                            
                    }
                }                
                
                
            })

            .state('dashboard.route', {
                url: '/route',                
                views:{
                    "contentview":{
                        templateUrl: 'partials/route.html' ,
                        controller : 'routeCtrl' 
                                            
                    }
                }                
                
                
            })
            .state('dashboard.route.start', {
                url: '/start',
                views:{
                    "routeview":{
                        templateUrl: 'partials/routestart.html'  ,
                       controller : 'routestartCtrl'
                                            
                    }
                }                
                
                
            })
            .state('dashboard.route.end', {
                url: '/end',
                views:{
                    "routeview":{
                        templateUrl: 'partials/routeend.html'  ,
                       controller : 'routeendCtrl'
                                            
                    }
                }                
                
                
            })
            
            .state('dashboard.route.data', {
                url: '/data',
                views:{
                    "routeview":{
                        templateUrl: 'partials/routedata.html'  ,
                       controller : 'routedataCtrl'
                                            
                    }
                }                
                
                
            })
            .state('dashboard.supplier', {
                url: '/supplier',
                views:{
                    "contentview":{
                        templateUrl: 'partials/supplier.html' ,
                        controller : 'supplierCtrl' 
                                            
                    }
                }                
                
                
            })
            .state('dashboard.labr', {
                url: '/labresults',
                views:{
                    "contentview":{
                        templateUrl: 'partials/labr.html'  ,
                        controller : 'labrCtrl'
                                            
                    }
                }                
                
                
            })

            .state('dashboard.device', {
                url: '/device',
                views:{
                    "contentview":{
                        templateUrl: 'partials/device.html'  ,
                        controller: 'deviceCtrl'
                                            
                    }
                }                
                
                
            })

            .state('dashboard.driver', {
                url: '/driver',
                views:{
                    "contentview":{
                        templateUrl: 'partials/driver.html'  ,
                        controller :'driverCtrl'
                                            
                    }
                }                
                
                
            })
             .state('dashboard.processor', {
                url: '/processor',
                views:{
                    "contentview":{
                        templateUrl: 'partials/processor.html'  ,
                        controller :'processorCtrl'
                                            
                    }
                }  
                
            })
             
}]);
var tankerapp =angular.module('tankerapp');
tankerapp
.run(['$rootScope',
	'$state',	
	'$http',
	'$interval',
	'dfo',
	'Notification'
	,
function($rootScope,$state,$http,$interval,dfo,Notification){	
	
	 // Default run of application
	 if(!$rootScope.device){
	 	 $rootScope.device = dfo.getMethod('device/fetchall').then(function(response){
 			return response;
 })
	 }

	$rootScope.$on('$stateChangeStart', 
		//cancel the timer pulling information from server when page is routed from dashboard
		function(event, toState, toParams, fromState, fromParams) {			
			
	    /*	    
		Add Authorization token on each request
		*/
	    if(toState.name !== 'login' && toState.name !== 'forgot' ){	   
	    	
	    	var then = sessionStorage.getItem('time');	
	    	

	    	if(then || then != null){
	    	var now  = moment().toJSON();
		var ms = moment(now).diff(moment(then));
		var d = moment.duration(ms);
		console.log(d._data.minutes);
		if(parseFloat(d._data.minutes) > 30 ){
			Notification.error({ title:'Session Exprired',message:'Please Login Again' ,delay : 4000 } );
			sessionStorage.removeItem('time');	
	    		event.preventDefault();
	    		$state.go('login')    ;   
		}
	    	}
	    	else
	    	{
	    		
	    		event.preventDefault();
	    		$state.go('login')    ;    
	    	
	    	}
	    	
	    	
	  
	    }
	})


}])

var tankerapp = angular.module('tankerapp');
tankerapp
// Main Application Controller
.controller('appCtrl', function($scope,$http,dfo,$mdSidenav,$rootScope) {

 

  dfo.getMethod('dpu/fetch').then(function(data){
    $scope.data = data
  })
$scope.postData = function(){
	
	dfo.postMethod('tloc/push',$scope.pushtext)
}      

});

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('cipCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	
if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
    $rootScope.alldevices = devices
   }) 
}
dfo.getMethod ('cip/fetchall').then(function(response){
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
	      "dt" : value.dt,
	      "temp":parseFloat(value.temp)/10,
	      
	    })
	})
})

$scope.formdata = {};
$scope.formdata.time=new Date();

$scope.ok = function(){
	var string = '##' + 
	$scope.formdata.did + ',' +
	//$scope.formdata.time.toISOString() + ',' +
	moment($scope.formdata.time).format("YYYYMMDDTHHmmss") + 'Z,' +
	$scope.formdata.temp*10 + ',' 
	string = string + 'return,*'

	dfo.postMethod('cip/push',string).then(function(response){		
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
                               "tankid" : $scope.formdata.tankid,
                              "truckid" : $scope.formdata.truckid,
				      "did" : $scope.formdata.did,
				      "dt" : moment($scope.formdata.time).format("YYYY-MM-DD HH:mm:ss"),
				      "temp" : parseFloat($scope.formdata.temp)
				      
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
  { field: 'tankid' ,displayName:'Tank ID' ,enableCellEdit : false},
   { field: 'truckid' ,displayName:'Truck ID' ,enableCellEdit : false},
   { field: 'dt',displayName:'Date' ,enableCellEdit : false,width : 160 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'temp',displayName:'Temp.' }	,
  
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
	    if(['temp'].indexOf(data.change) != -1  ){
	    	data.value = parseFloat(newValue) *10;	    	
	    }else
	    {
	    	data.value = newValue;	    
	    }
    	dfo.postMethod('cip/update',data).then(function(response){
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
$scope.delete= function(){
  if( $scope.gridApi.selection.getSelectedRows().length == 0){
          Notification.error({message: 'Please select a record ', delay: 3000});
        }else{

          var selection = $scope.gridApi.selection.getSelectedRows();

          var data ={}; 
          data.id = selection[0] .id;

          dfo.postMethod('cip/delete' , data).then(function(response){
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

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('deviceCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification) {	
dfo.getMethod ('device/fetchall').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  		

    $scope.myData.push(
    	{
		  "id" : value._id.$id,
		  "did" : value.did,
	      "tankid" : value.tankid,
	      "truckid" : value.truckid,
	      "dstatus" : value.dstatus	      
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
	$scope.formdata.tankid + ',' +
	$scope.formdata.truckid + ',' +
	$scope.formdata.dstatus + ',' ;
	string = string + 'return,*';

	dfo.postMethod('device/push',string).then(function(response){		
		if(response.status == 200){			
			 $scope.myData.push(
			    	{
					  "id" : response.data.$id,
				      "did" : $scope.formdata.did,
				      "tankid" : $scope.formdata.tankid,
				      "truckid" : $scope.formdata.truckid,
				      "dstatus" : $scope.formdata.dstatus 
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
   { field: 'tankid',displayName:'Tanker ID' }	,
   { field: 'truckid',displayName:'Truck ID' }	,
   { field: 'dstatus',displayName:'Status' }	
  
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
    	dfo.postMethod('device/update',data).then(function(response){
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
$scope.delete= function(){
	if( $scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please select a record ', delay: 3000});
				}else{

					var selection = $scope.gridApi.selection.getSelectedRows();

					var data ={}; 
					data.id = selection[0] .id;

					dfo.postMethod('device/delete' , data).then(function(response){
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

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('dpuCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	

if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
   	$rootScope.alldevices = devices;
   })	
}

dfo.getMethod ('dpu/fetchdpu').then(function(response){
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
   multiSelect: false,
   enableColumnResizing : true,
   paginationPageSizes: [10, 20, 30],
   paginationPageSize: 10,
   columnDefs:[
   { field: 'did' ,displayName:'Device' ,enableCellEdit : false},
   { field: 'tankid' ,displayName:'Tank ID' ,enableCellEdit : false},
   { field: 'truckid' ,displayName:'Truck ID' ,enableCellEdit : false},
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
   

  });
};
 
$scope.delete= function(){
	if( $scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please select a record ', delay: 3000});
				}else{

					var selection = $scope.gridApi.selection.getSelectedRows();

					var data ={}; 
					data.id = selection[0] .id;

					dfo.postMethod('dpu/delete' , data).then(function(response){
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

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('driverCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	

if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
   	$rootScope.alldevices = devices;
   })	
}

dfo.getMethod ('driver/fetchall').then(function(response){
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
	      "driverid" : value.driverid,
	      "drivername" : value.drivername
	          
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
	$scope.formdata.driverid + ',' +
	$scope.formdata.drivername + ',' 
	
	string = string + 'return,*';

	dfo.postMethod('driver/push',string).then(function(response){		
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
				      "driverid" : $scope.formdata.driverid,
				      "drivername" : $scope.formdata.drivername,
				      
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
   { field: 'tankid' ,displayName:'Tank ID' ,enableCellEdit : false},
   { field: 'truckid' ,displayName:'Truck ID' ,enableCellEdit : false},
   { field: 'driverid',displayName:'Driver ID' }	,
   { field: 'drivername',displayName:'Driver Name' }	,
   
  
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
    	dfo.postMethod('driver/update',data).then(function(response){
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
$scope.delete= function(){
	if( $scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please select a record ', delay: 3000});
				}else{

					var selection = $scope.gridApi.selection.getSelectedRows();

					var data ={}; 
					data.id = selection[0] .id;

					dfo.postMethod('driver/delete' , data).then(function(response){
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


var tankerapp = angular.module('tankerapp');
tankerapp
.controller('LoginCtrl',[
  '$scope', 
  '$rootScope', 
  'Notification',
  '$state',

 function ($scope, $rootScope,Notification,$state) {

  $scope.credentials = {
    username: '',
    password: ''
  };

  //main login page controller. 
  
  $scope.login = function(credentials){

 if(credentials.username != 'admin' || credentials.password !='admin'){
  Notification.error({ title:'Login Failed',message:'Incorrect Credentials' ,delay : 4000 } );

 }else
 {
  sessionStorage.setItem('time',moment().toJSON());
  $state.go('dashboard.dpu');
 }    
   //  //Checking credintials
  	// LoginService.login(credentials).then(function(response){

   //  if(!response){
   //  //if no response recevied
   //  Notification.error({ title:'Login Failed',message:'Incorrect Credentials' ,delay : 4000 } );
   //  }
    
   //  //routing to main application on successful login
   //  $state.go('app.dashboard');
  	// },function(response){
   //       //console.log(response)   ;
  		
  	// });
  	
  }
}])

var tankerapp = angular.module('tankerapp');
tankerapp
// Main Application Controller
.controller('navCtrl', function($scope,$http,$location) {

 /*$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };*/

});


var tankerapp = angular.module('tankerapp');
tankerapp
.controller('processorCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	

if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
   	$rootScope.alldevices = devices;
   })	
}

dfo.getMethod ('processor/fetchall').then(function(response){
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
	      "did" : value.did,
	      "tankid" : value.tankid,
	      "truckid" : value.truckid,
	      "pid" : value.pid ,
	      "pname":value.pname,
	      "destID":value.destID,
	      "destName":value.destName,
	      "lat" : value.lat,
	      "long" : value.long 
	      
	      
	    })
    
	})
})

$scope.formdata = {};		
$scope.panelstatus = false;
$scope.ok = function(){
	var string = '##' + 
	$scope.formdata.did + ',' +
	$scope.formdata.pid + ',' +
	$scope.formdata.pname + ',' +
	$scope.formdata.destID + ',' +
	$scope.formdata.destName + ',' +
	$scope.formdata.lat + ',' +
	$scope.formdata.long + ',' 	
	string = string + 'return,*'

	dfo.postMethod('processor/push',string).then(function(response){		
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
				     "tankid" :  $scope.formdata.tankid,
	      				"truckid" :  $scope.formdata.truckid,
				      "did" : $scope.formdata.did,
				      "pid" : $scope.formdata.pid ,
				      "pname":$scope.formdata.pname,
				      "destID":$scope.formdata.destID,
				      "destName":$scope.formdata.destName,
				      "lat" : $scope.formdata.lat,
				      "long" : $scope.formdata.long ,
				     			      
				      
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
   { field: 'tankid' ,displayName:'Tank ID' ,enableCellEdit : false},
   { field: 'truckid' ,displayName:'Truck ID' ,enableCellEdit : false},
   { field: 'pid',displayName:'Processor ID' }	,
   { field: 'pname',displayName:'Processor Name' }	,
   { field: 'destID',displayName:'Destination ID' }	,
    { field: 'destName',displayName:'Destination Name' }	,
   { field: 'lat',displayName:'Lat' }	,
   { field: 'long',displayName:'Long' }	   
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
    	dfo.postMethod('processor/update',data).then(function(response){
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

					dfo.postMethod('processor/delete' , data).then(function(response){
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

var tankerapp = angular.module('tankerapp');
tankerapp
// Main Application Controller
.controller('routeCtrl', function($scope,$state) {
 
	$state.go('dashboard.route.start');
  

})

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

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('routestartCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	

if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
   	$rootScope.alldevices = devices;
   })	
}
dfo.getMethod ('route/fetchallstart').then(function(response){
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
	      "dt" : value.dt,
	      "rno" : value.rno,
	      "lat" : value.lat,
	      "long" : value.long ,
	      "dvrid" :value.dvrid,
	      "prno":value.prno
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
	$scope.formdata.rno + ',' +
	$scope.formdata.dvrid + ',' +
	$scope.formdata.lat + ',' +
	$scope.formdata.long + ',' +
	$scope.formdata.prno + ',' 
	string = string + 'return,*'

	dfo.postMethod('route/pushstart',string).then(function(response){		
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
				      "dt" : moment($scope.formdata.time).format("YYYY-MM-DD HH:mm:ss"),
				      "rno" : $scope.formdata.rno,
				      "lat" : $scope.formdata.lat,
				      "long" : $scope.formdata.long ,
				      "dvrid" :$scope.formdata.dvrid,
				      "prno":$scope.formdata.prno
				      
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
   { field: 'tankid' ,displayName:'Tank ID' ,enableCellEdit : false},
   { field: 'truckid' ,displayName:'Truck ID' ,enableCellEdit : false},
   { field: 'dt',displayName:'Date' ,enableCellEdit : false,width : 160 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'rno',displayName:'Route #' }	,
   { field: 'dvrid',displayName:'Driver ID' }	,        
   { field: 'lat',displayName:'Lat' }	,
   { field: 'long',displayName:'Long' }	,   
   { field: 'prno',displayName:'Processor #' }	
    
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
    	dfo.postMethod('route/updatestart',data).then(function(response){
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

$scope.delete= function(){
	if( $scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please select a record ', delay: 3000});
				}else{

					var selection = $scope.gridApi.selection.getSelectedRows();

					var data ={}; 
					data.id = selection[0] .id;

					dfo.postMethod('route/deletestart' , data).then(function(response){
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

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('routeendCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	

if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
   	$rootScope.alldevices = devices;
   })	
}

dfo.getMethod ('route/fetchallend').then(function(response){
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
	      "dt" : value.dt,
	      "rno" : value.rno,
	      "lat" : value.lat,
	      "long" : value.long ,
	      "sibtemp":parseFloat(value.sibtemp)/10,
	      "mltemp":parseFloat(value.mltemp)/10,
	      "prno" :value.prno,
	      "frsn" :value.frsn,
	      
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
	$scope.formdata.rno + ',' +	
	$scope.formdata.lat + ',' +
	$scope.formdata.long + ',' +
	$scope.formdata.sibtemp*10 + ',' +
	$scope.formdata.mltemp*10 + ',' +
	$scope.formdata.prno + ',' +
	$scope.formdata.frsn + ',' 
	string = string + 'return,*'

	dfo.postMethod('route/pushend',string).then(function(response){		
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
				      "dt" : moment($scope.formdata.time).format("YYYY-MM-DD HH:mm:ss"),
				      "rno" : $scope.formdata.rno,
				      "lat" : $scope.formdata.lat,
				      "long" : $scope.formdata.long ,
				      "sibtemp":parseFloat($scope.formdata.sibtemp),
				      "mltemp":parseFloat($scope.formdata.mltemp),
				      "prno" : $scope.formdata.prno,
				      "frsn" : $scope.formdata.frsn,			     
				      
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
   { field: 'tankid' ,displayName:'Tank ID' ,enableCellEdit : false},
   { field: 'truckid' ,displayName:'Truck ID' ,enableCellEdit : false},
   { field: 'dt',displayName:'Date' ,enableCellEdit : false,width : 160 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'rno',displayName:'Route #' }	,          
   { field: 'lat',displayName:'Lat' }	,
   { field: 'long',displayName:'Long' }	,   
   { field: 'sibtemp',displayName:'S. Ice Box Temp.' }	, 
   { field: 'mltemp',displayName:'Milk Load Temp.' }	, 
   { field: 'prno',displayName:'Procecssor Ref #' },
   { field: 'frsn',displayName:'Factory Sample #' }	
   
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
	    if(['sibtemp','mltemp'].indexOf(data.change) != -1  ){
	    	data.value = parseFloat(newValue) *10;	    	
	    }else
	    {
	    	data.value = newValue;	    
	    }
    	dfo.postMethod('route/updateend',data).then(function(response){
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
$scope.delete= function(){
	if( $scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please select a record ', delay: 3000});
				}else{

					var selection = $scope.gridApi.selection.getSelectedRows();

					var data ={}; 
					data.id = selection[0] .id;

					dfo.postMethod('route/deleteend' , data).then(function(response){
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
	      "supID" : value.supID,
	      "pid" : value.pid ,
	      "supno":value.supno,
	      "supname":value.supname,
	      "street":value.street,
	      "city":value.city,
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
	
	$scope.formdata.supno + ',' +
	$scope.formdata.supname + ',' +
	$scope.formdata.street + ',' +
	$scope.formdata.city + ',' +
	$scope.formdata.lat + ',' +
	$scope.formdata.long + ',' +	
	$scope.formdata.expqty*10 + ',' 
	string = string + 'return,*'

	dfo.postMethod('supplier/push',string).then(function(response){		
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
				      "supID" : $scope.formdata.supID,
				      "pid" : $scope.formdata.pid ,
				      "supno":$scope.formdata.supno,
				      "supname":$scope.formdata.supname,
				      "street":$scope.formdata.street,
				      "city":$scope.formdata.city,
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
   { field: 'tankid' ,displayName:'Tank ID' ,enableCellEdit : false},
   { field: 'truckid' ,displayName:'Truck ID' ,enableCellEdit : false},
   { field: 'supID',displayName:'Supp ID' }	,
   { field: 'pid',displayName:'Processor ID' }	,
   { field: 'supno',displayName:'Supp #' }	,
   { field: 'supname',displayName:'Supp Name' }	,
    { field: 'street',displayName:'Street' }	,
   { field: 'city',displayName:'City' }	,
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

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('tlocCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification,$rootScope) {	

if(!$rootScope.alldevices){
 $rootScope.device.then(function(devices){
   	$rootScope.alldevices = devices;
   })	
}	

dfo.getMethod ('tloc/fetchall').then(function(response){
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
   { field: 'tankid' ,displayName:'Tank ID' ,enableCellEdit : false},
   { field: 'truckid' ,displayName:'Truck ID' ,enableCellEdit : false},
   { field: 'dt',displayName:'Date' ,enableCellEdit : false,width : 160 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'lat',displayName:'Lat' }	,
   { field: 'long',displayName:'Long' }	
    
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

$scope.delete= function(){
	if( $scope.gridApi.selection.getSelectedRows().length == 0){
					Notification.error({message: 'Please select a record ', delay: 3000});
				}else{

					var selection = $scope.gridApi.selection.getSelectedRows();

					var data ={}; 
					data.id = selection[0] .id;

					dfo.postMethod('tloc/delete' , data).then(function(response){
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

// FACTORY FOR DATA
var tankerapp = angular.module('tankerapp');
tankerapp
.factory('dfo',['$http','$q', function($http,$q){
//Factory to recevie user device data and readings based on user
return{

  getMethod:function(api){
            var deferred = $q.defer();
            $http({
             url:'http://localhost/tankerApi/'+ api,
              // url:'http://52.62.42.42/api/'+api,              
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
    //url:'http://www.smartafarm.com.au/api/'+api,
    url:'http://localhost/tankerApi/'+ api,
    //url:'http://52.62.42.42/api/'+ api,    
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
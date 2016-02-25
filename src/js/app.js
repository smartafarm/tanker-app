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
                templateUrl: 'templates/login.html',
                controller : 'LoginCtrl',
                data :{}
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
                
    }
]);
var tankerapp =angular.module('tankerapp');
tankerapp
.run(['$rootScope',
	'$state',	
	'$http',
	'$interval',
	
function($rootScope,$state,$http,$interval){	
	
	 // Default run of application

	$rootScope.$on('$stateChangeStart', 
		//cancel the timer pulling information from server when page is routed from dashboard
		function(event, toState, toParams, fromState, fromParams) {			
			var cancelEvents =function(){
		 	 $interval.cancel($rootScope.timer);
		 }
		 cancelEvents();
	    /*	    
		Add Authorization token on each request
		*/
	    if(toState.name !== 'login' && toState.name !== 'forgot' ){	   
	    	
	    /*	var token = sessionStorage.getItem('reqTok');		    	
	    	var bearer = sessionStorage.getItem('user');

	    	if (token && bearer){
	    		$http.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' }
	    		$http.defaults.headers.get = { 'Content-Type': 'application/json' }
	    		$http.defaults.headers.common['X-Auth-Token'] = token   ;
	    		$http.defaults.headers.common['Bearer'] = bearer			    			    ;
	    		
		    	if(!$rootScope.user){
	                                                     
	                $rootScope.getuser = userFactory.receive('fetch/getuserinfo/'+bearer).then
	                (function(response){
	                   if(response){
	                        return response;      
	                   }
	                  return
	               })
            	}
	    	}
	    	else 
	    	{	
	    		//if no token or bearer found
	    		event.preventDefault();	    		
	    		sessionService.destroy('user');
	    		$http.defaults.headers.common['X-Auth-Token'] = undefined
	    		$http.defaults.headers.common['Bearer'] = undefined   			    			    

	    		$state.go('login')
	    	};*/
	    }else{
	    	
	    	/*if($rootScope.user){	    			
	    			 delete $rootScope.user ;
	    		}*/
	    }
	})


}])

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

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('cipCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification) {	
dfo.getMethod ('cip/fetchall').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  		
   	
    $scope.myData.push(
    	{
		  "id" : value._id.$id,
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
			 $scope.myData.push(
			    	{
					  "id" : response.data.$id,
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
   { field: 'dt',displayName:'dt' ,enableCellEdit : false,width : 160 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'temp',displayName:'temp' }	,
  
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
 

});

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
   { field: 'dt',displayName:'dt' ,enableCellEdit : false,width : 160 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'lat',displayName:'lat' }	,
   { field: 'long',displayName:'long' }	,
   { field: 'route',displayName:'route' }	,
   { field: 'supplier',displayName:'supp' }	,
   { field: 'tavg',displayName:'tavg' }	,
   { field: 'tmin',displayName:'tmin' }	,
   { field: 'tmin',displayName:'tmin' }	,
   { field: 'vol',displayName:'vol' }	   
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

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('driverCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification) {	
dfo.getMethod ('driver/fetchall').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  		

    $scope.myData.push(
    	{
		  "id" : value._id.$id,
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
			 $scope.myData.push(
			    	{
					  "id" : response.data.$id,
				      "did" : $scope.formdata.did,
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
// Main Application Controller
.controller('navCtrl', function($scope,$http,$location) {

 /*$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };*/

});


var tankerapp = angular.module('tankerapp');
tankerapp
// Main Application Controller
.controller('routeCtrl', function($scope,$state) {
 
	$state.go('dashboard.route.start');
  

})

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('routestartCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification) {	
dfo.getMethod ('route/fetchallstart').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  		

    $scope.myData.push(
    	{
		  "id" : value._id.$id,
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
			 $scope.myData.push(
			    	{
					  "id" : response.data.$id,				     
				      "did" : $scope.formdata.did,
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
   { field: 'dt',displayName:'dt' ,enableCellEdit : false,width : 160 ,sort: {
          direction: uiGridConstants.DESC,
          priority: 0,
        }}	,
   { field: 'rno',displayName:'rno' }	,
   { field: 'dvrid',displayName:'dvrid' }	,        
   { field: 'lat',displayName:'lat' }	,
   { field: 'long',displayName:'long' }	,   
   { field: 'prno',displayName:'prno' }	
    
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
 

});

var tankerapp = angular.module('tankerapp');
tankerapp
.controller('routeendCtrl', function($scope,$timeout,dfo,uiGridConstants,Notification) {	
dfo.getMethod ('route/fetchallend').then(function(response){
   var data = response;       
   $scope.myData = [];        
   data.forEach(function(value,key){  		

    $scope.myData.push(
    	{
		  "id" : value._id.$id,
	      "did" : value.did,
	      "dt" : value.dt,
	      "rno" : value.rno,
	      "lat" : value.lat,
	      "long" : value.long ,
	      "sibtemp":parseFloat(value.sibtemp)/10,
	      "mltemp":parseFloat(value.mltemp)/10,
	      "frno" :value.frno,
	      
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
	$scope.formdata.frno + ',' 
	string = string + 'return,*'

	dfo.postMethod('route/pushend',string).then(function(response){		
		if(response.status == 200){			
			 $scope.myData.push(
			    	{
					  "id" : response.data.$id,				     
				      "did" : $scope.formdata.did,
				      "dt" : moment($scope.formdata.time).format("YYYY-MM-DD HH:mm:ss"),
				      "rno" : $scope.formdata.rno,
				      "lat" : $scope.formdata.lat,
				      "long" : $scope.formdata.long ,
				      "sibtemp":parseFloat($scope.formdata.sibtemp),
				      "mltemp":parseFloat($scope.formdata.mltemp),
				      "frno" : $scope.formdata.frno,			     
				      
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
   { field: 'rno',displayName:'rno' }	,          
   { field: 'lat',displayName:'lat' }	,
   { field: 'long',displayName:'long' }	,   
   { field: 'sibtemp',displayName:'sibtemp' }	, 
   { field: 'mltemp',displayName:'mltemp' }	, 
   { field: 'frno',displayName:'frno' }	
    
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
 

});

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

// FACTORY FOR DATA
var tankerapp = angular.module('tankerapp');
tankerapp
.factory('dfo',['$http','$q', function($http,$q){
//Factory to recevie user device data and readings based on user
return{

  getMethod:function(api){
            var deferred = $q.defer();
            $http({
                url:'http://52.62.42.42/api/'+api,              
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
    //url:'http://localhost/tankerApi/'+ api,
    url:'http://52.62.42.42/api/'+ api,    
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
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

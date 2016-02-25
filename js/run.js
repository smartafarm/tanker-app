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

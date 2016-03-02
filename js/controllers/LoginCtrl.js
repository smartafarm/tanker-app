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

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
            .state('dashboard.route.view', {
                url: '/view',
                views:{
                    "routeview":{
                        templateUrl: 'partials/viewroute.html'  ,
                       controller : 'routeviewCtrl'
                                            
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
              .state('dashboard.org', {
                url: '/organisation',
                views:{
                    "contentview":{
                        templateUrl: 'partials/organisation.html'  ,
                        controller :'orgCtrl'
                                            
                    }
                }  
                
            })
             
             
}]);
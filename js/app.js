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

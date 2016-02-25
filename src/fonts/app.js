var sfarm = angular
.module('sfarm', [
'ui.router',
'ui.bootstrap',
'cgNotify',
'ngAnimate',
'chart.js',
'nvd3',
'oc.lazyLoad',
'ui.grid',

])
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',  
  guest: 'guest'
})

.config(function($httpProvider) {

  $httpProvider.interceptors.push('reqInspect');
})
.filter('ucf', function()
{
    return function(word)
    {
        return word.substring(0,1).toUpperCase() + word.slice(1);
    }
})
.filter('valueFilter', function()
{
    return function(word)
    {
        //console.log(word);
        var label = word.id;        
        
        var indidcate = word.value.substring(0, 1);
        if (word.type==='Temp'){
          var wordValue  = parseFloat(word.value) ;
          return label + ' : '   + wordValue +' ℃ ';//&#8451  °C
        }else if(word.type==='Level')
        {
          var wordValue  = parseFloat(word.value) 
          return label + ' : '   + wordValue + ' % '
        }else{
          var wordValue  = parseFloat(word.value) ;
          return label + ' : '   + wordValue 
        }
        
    }
})
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    
    ChartJsProvider.setOptions({
   		scaleBeginAtZero: true
     
    });


   
  }])
  .config(['$animateProvider', function($animateProvider) {
          $animateProvider.classNameFilter(/^((?!(ui-grid-menu)).)*$/);
      }
  ]);

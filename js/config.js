angular.module('tankerapp')
.config(function($mdDateLocaleProvider) {

	//Formatting Date in Ng-Material Date Picker
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD-MM-YYYY');
    };
});
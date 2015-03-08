'use strict';

var Hello = angular.module('Hello', ['ngRoute']);

Hello.config(['$routeProvider', '$locationProvider',
 function(
   $routeProvider,
  $locationProvider) {

    $routeProvider.when(
    	'/',
    	{
    		templateUrl: 'app/views/partials/home.html',
    		controller: 'HomeCtrl',
    	}
    );
    $routeProvider.when(
      '/tech',
      {
        templateUrl: 'app/views/partials/tech.html',
        controller: 'TechCtrl',
      }
    );
    $routeProvider.when(
      '/about',
      {
        templateUrl: 'app/views/partials/about.html',
        controller: 'AboutCtrl',
      }
    );
    $routeProvider.otherwise(
        {
            redirectTo: '/'
        });

    //$locationProvider.html5Mode(true);
}]);

Hello.run( function($rootScope, $location) {

});

'use strict';

var Hello = angular.module('Hello', ['ngRoute']);

Hello.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when(
    	'/home',
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
    $routeProvider.otherwise(
        {
            redirectTo: '/home'
        });
}]);

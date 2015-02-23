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
    $routeProvider.otherwise(
        {
            redirectTo: '/home'
        });
}]);

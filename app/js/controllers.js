'use strict';

Hello.controller('ApplicationController', function () {

    window.disqus_shortname = 'Hello';
});


Hello.controller("HomeCtrl", function ($scope, viewFactory) {
  console.log('what is happening!');
  $scope.title = 'Whatever This is!';
  viewFactory.init();
});

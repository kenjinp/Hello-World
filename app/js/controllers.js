'use strict';

Hello.controller('ApplicationController', function () {

    window.disqus_shortname = 'Hello';
});


Hello.controller("HomeCtrl", function ($scope) {
  console.log('what is happening!');
  $scope.title = 'Whatever This is!';
});

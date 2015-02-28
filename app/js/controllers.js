'use strict';

Hello.controller('ApplicationController', function (
  $scope,
  gridFactory) {

    //window.disqus_shortname = 'Hello';
});


Hello.controller("HomeCtrl", function (
  $scope,
  gridFactory,
  viewFactory) {

  $scope.title = 'Whatever This is!';
  //viewFactory.init();
  gridFactory.init();
  gridFactory.show();

  $( window ).resize(function() {
    gridFactory.init();
  });

  $scope.show = function() {
    gridFactory.show();
  }

  $scope.hide = function() {
    gridFactory.hide();
  }

});

Hello.controller("TechCtrl", function (
  $scope,
  gridFactory,
  viewFactory) {

  $scope.title = 'Whatever This is!';
  $( window ).resize(function() {
    gridFactory.init();
  });
  gridFactory.init();
  gridFactory.show();

  $scope.show = function() {
    gridFactory.show();
  }

  $scope.hide = function() {
    gridFactory.hide();
  }

});

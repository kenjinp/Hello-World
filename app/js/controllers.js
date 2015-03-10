'use strict';

Hello.controller('ApplicationController', function (
  $rootScope,
  $scope,
  gridFactory,
  $location) {

    //window.disqus_shortname = 'Hello';

      $scope.show = function() {
        gridFactory.show();
      }
});


Hello.controller("HomeCtrl", function (
  $scope,
  gridFactory,
  viewFactory) {

  $scope.pageClass = 'page-home';

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

  $scope.hide = function(s) {
    gridFactory.hide('hide');
  }

  $scope.quote = '"The ultimate purpose of Daedric Lords is to instruct and improve the generally deplorable character of mortals." ―Anonymous Hermaeus Mora Follower';

});

Hello.controller("TechCtrl", function (
  $scope,
  gridFactory,
  viewFactory) {

  $scope.pageClass = 'page-tech';


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

Hello.controller("AboutCtrl", function (
  $scope,
  gridFactory,
  viewFactory) {

  $scope.pageClass = 'page-about';


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

Hello.controller("ProjectsCtrl", function (
  $scope,
  gridFactory,
  viewFactory) {

  $scope.pageClass = 'page-projects';


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

"use strict";

Hello.directive('inputtext', function ($timeout) {
    return {
        restrict:'E',
        replace:true,
        template:'<input type="text"/>',
        scope: {
        	//if there were attributes it would be shown here
        },
        link:function (scope, element, attrs, ctrl) {
        	// DOM manipulation may happen here.
        }
    }
});

Hello.directive('tile', function() {
  return {
    scope: {
      type:'=type'
    },
    transclude: true,
    template:
    '<div class="box hide">'+
      '<span ng-transclude>'+
      '</span>'+
    '</div>',
    link:function(scope, el) {
      el.append(scope.type)
    }
  }
});

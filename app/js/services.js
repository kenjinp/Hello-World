"use strict";

/*
 * Services can be defined as : "value", "service", "factory", "provider", or "constant".
 *
 * For simplicity only example of "value" and "service" are shown here.
 */

// EXAMPLE OF CORRECT DECLARATION OF SERVICE AS A VALUE
Hello.value('version', '0.1');

// EXAMPLE OF CORRECT DECLARATION OF SERVICE
// here is a declaration of simple utility function to know if an given param is a String.
Hello.service("UtilSrvc", function () {
    return {
        isAString: function(o) {
            return typeof o == "string" || (typeof o == "object" && o.constructor === String);
        },
        helloWorld : function(name) {
        	var result = "Hum, Hello you, but your name is too weird...";
        	if (this.isAString(name)) {
        		result = "Hello, " + name;
        	}
        	return result;
        }
    }
});

Hello.factory('viewFactory', function () {
  var viewFactory = {};

  viewFactory.init = function () {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    $('#viewer').append( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function render() {
      requestAnimationFrame( render );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.005;

      renderer.render( scene, camera );
    }

    render();
  }

  return viewFactory;
});

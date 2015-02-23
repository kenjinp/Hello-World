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

    var camera, scene, renderer;

    var dae

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('/app/models/siheyuan.dae', function ( collada ) {
      dae = collada.scene;
      //var skin = collada.skins[0];
      dae.scale.x = dae.scale.y = dae.scale.z = 25.0;

      init();
      animate();

      function init(){
        scene = new THREE.Scene();

        camera = new THREE.OrthographicCamera(
          window.innerWidth / -2,   // Left
          window.innerWidth / 2,    // Right
          window.innerHeight / 2,   // Top
          window.innerHeight / -2,  // Bottom
          -2000,            // Near clipping plane
          1000 );           // Far clipping plane

        camera.position.y = 0;

        camera.rotation.x = 0 * (Math.PI/ 180);

        scene.add(camera);

        var directionalLight = new THREE.DirectionalLight(0xeeeeee , 2);
        directionalLight.position.x = 0;
        directionalLight.position.y = 1;
        directionalLight.position.z = 0;
        //scene.add( directionalLight );

        var light = new THREE.HemisphereLight(0x16e0ff, 0x47ff16);
        //scene.add( light );

        var directionalLight2 = new THREE.DirectionalLight(0xeeeeee, 1);
          // A different way to specify the position:
        directionalLight2.position.set(-1, 0, 1);
        scene.add( directionalLight2 );

        scene.add(dae);

        renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        $('#viewer').append(renderer.domElement);
      }

      function animate() {
        requestAnimationFrame( animate );
        render();
      }

      function render() {
        //update scene
        camera.rotation.y += 0.005;
        renderer.render(scene, camera);
      }

    })
  }

  return viewFactory;
});

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

Hello.factory('gridFactory', function () {
  var gridFactory = {};
  var boxArr = [];
  var gBoxHeight = 0;
  var gBoxWidth = 0;
  var gBoxHolderHeight = 0;

  gridFactory.init = function () {

    $('.box').each(function (i) {
      if (i == $('.box').length) return
      var el = $(this)
      if (el.hasClass("invis")) {
        el.remove()
      }
      var randomNum = Math.ceil(Math.random()*5);
      if (randomNum === 1 && $('.box.invis').length <= 2) {
        el.after('<div class="box invis"></div>');
      }
    });
    var viewportHeight = $(window).height();
    var boxHolderHeight = viewportHeight - 100;
    gBoxHolderHeight = boxHolderHeight;
    var boxHolderWidth = $('.box-holder').width() - 100;
    $('.box-holder').height(boxHolderHeight);
    var boxHeight = boxHolderHeight / 8;
    gBoxHeight = boxHeight;
    var boxWidth = boxHolderWidth / 3;
    gBoxWidth = boxWidth;
    $('.box').height(boxHeight);
    $('.box').width(boxWidth);
    $('.box.wide').width(boxWidth * 2);
    $('.box.big').height((boxHeight * 3));
    $('.box.big').width(boxWidth);
    $('.page').width(boxHolderWidth);
    $('.page').height(boxHeight * 4);
    if ($(window).width() > 767){
      mouseGridShift();
    }
  }

  gridFactory.show = function () {
    var speed = 200,
        delay = 100;

    $('.box').each(function (i) {
      var el = $(this)
      if (el.hasClass("invis")) return
      setTimeout( function() {
        var speedString = speed + 'ms ' + ( i * delay ) + 'ms';
        var cssString = 'transform ' + speedString +', opacity '+ speedString;
        el.css('-webkit-transition', cssString);
        el.css('-moz-transition', cssString);
        el.css('transition', cssString);
        el.removeClass('hide');
        el.addClass('shown');
      }, 100 );
    });
  }

  gridFactory.hide = function (target) {
    var speed = 200,
        delay = 100;
    $($('.box').get().reverse()).each(function (i) {
      var el = $(this)
      if (el.attr('id') == target) {
        //setTimeout(function() {
        //  gridFactory.embiggen(target);
        //}, speed + ($('.box').length * delay));
        //return true;
      }
      if (el.attr('id') == 'home') return true;
      //if (el.hasClass("invis")) return true;
      setTimeout( function() {
        var speedString = speed + 'ms ' + ( i * delay ) + 'ms';
        var cssString = 'transform ' + speedString +', opacity '+ speedString;
        el.css('-webkit-transition', cssString);
        el.css('-moz-transition', cssString);
        el.css('transition', cssString);
        el.removeClass('shown');
        el.addClass('hide');
        setTimeout(function() {
          //el.remove();
        }, speed + (i * delay));
      }, 100 );
    });
  }

  gridFactory.embiggen = function (s) {
    var el = $('#'+s);
    el.addClass('embiggened');
    el.animate({
      left:"0px",
      top:gBoxHeight+"px",
      width:gBoxWidth*3+"px",
      height:(gBoxHolderHeight - gBoxHeight)+"px"
    }, 200, function() {
    });

  }

  function mouseGridShift() {
    $( "html" ).mousemove(function( event ) {
      var tempX = event.pageX,
          viewportWidth = $(window).width(),
          axis = $('.box-holder').width() / 2,
          graphBoundryX = viewportWidth - axis,
          limitY = 26,
          x = (tempX - axis),
          y = (limitY*Math.sin((1/(graphBoundryX*0.6666)*x)));
      $(".box-holder").css({'transform':'perspective(600px) rotateY( '+ y +'deg )'});
    });
  }

  return gridFactory;
});

Hello.factory('viewFactory', function () {
  var viewFactory = {};

  viewFactory.init = function () {

    var camera, scene, renderer;

    var dae

    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load('/app/models/siheyuan2.dae', function ( collada ) {
      dae = collada.scene;
      //var skin = collada.skins[0];
      dae.scale.x = dae.scale.y = dae.scale.z = 60.0;

      init();
      render();

      function init(){
        scene = new THREE.Scene();

        scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

        //camera = new THREE.OrthographicCamera(
        //  window.innerWidth / -2,   // Left
        //  window.innerWidth / 2,    // Right
        //  window.innerHeight / 2,   // Top
        //  window.innerHeight / -2,  // Bottom
        //  -2000,            // Near clipping plane
        //  1000 );           // Far clipping plane

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );

        camera.position.y = 500;

        camera.rotation.x = 0 * (Math.PI/ 500);

        scene.add(camera);

        var directionalLight = new THREE.DirectionalLight(0xffffff , 2);
        directionalLight.position.x = 0;
        directionalLight.position.y = 1;
        directionalLight.position.z = 0;
        //scene.add( directionalLight );

        var light = new THREE.HemisphereLight(0x16e0ff, 0x47ff16, 1);
        //scene.add( light );

        var directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
          // A different way to specify the position:
        directionalLight2.position.set(100, 0, 10);
        scene.add( directionalLight2 );

        var pointLight = new THREE.PointLight(0xffffff, 2);
        pointLight.position.set(0, 300, 200);

        scene.add(pointLight);


        var pointLight2 = new THREE.PointLight(0xffffff, 2);
        pointLight2.position.set(0, -300, -200);

        scene.add(pointLight2);

        //scene.add(dae);

        dae.rotation.y += 140;

        renderer = new THREE.WebGLRenderer({alpha: true});
        //renderer.setSize($('#viewer').width(),$('#viewer').height());
        $('#viewer').append(renderer.domElement);

        //triangles
        var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
        var material =  new THREE.MeshLambertMaterial( { color:0xFF5E5E, shading: THREE.FlatShading } );

        for ( var i = 0; i < 500; i ++ ) {

          var mesh = new THREE.Mesh( geometry, material );
          mesh.position.x = ( Math.random() - 0.5 ) * 2000;
          mesh.position.y = ( Math.random() - 0.5 ) * 2000;
          mesh.position.z = ( Math.random() - 0.5 ) * 2000;
          mesh.updateMatrix();
          mesh.matrixAutoUpdate = false;
          scene.add( mesh );

        }
        //more lights
        // lights

        light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        light = new THREE.DirectionalLight( 0x002288 );
        light.position.set( -1, -1, -1 );
        scene.add( light );

        light = new THREE.AmbientLight( 0x222222 );
        scene.add( light );

        window.addEventListener( 'resize', onWindowResize, false );
        // renderer

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        animate();
      }

      function mouseMove() {
        $( "canvas" ).mousemove(function( event ) {
          var tempX = event.pageX,
              tempY = event.pageY;
          //var theta = - ( ( tempX) * 0.5 ) + tempX;
          //var phi = ( ( tempY ) * 0.5 ) + tempY;

          //phi = Math.min( 180, Math.max( 0, phi ) );

          //camera.position.x = radious * Math.sin( theta * Math.PI / 360 )
          //                      * Math.cos( phi * Math.PI / 360 );
          //camera.position.y = radious * Math.sin( phi * Math.PI / 360 );
          //camera.position.z = radious * Math.cos( theta * Math.PI / 360 )
          //                      * Math.cos( phi * Math.PI / 360 );
          camera.rotation.x += tempX;
        });
      }

      function animate() {
        requestAnimationFrame( animate );
      }

      function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        render();

      }


      function render() {
        //update scene
        //camera.rotation.y += 0.0005;
        //dae.rotation.y += 0.005;
        mouseMove();
        renderer.render(scene, camera);
      }

    })
  }

  return viewFactory;
});

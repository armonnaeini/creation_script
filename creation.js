    var container, stats;
    var camera, scene, raycaster, renderer;

    var mouse = new THREE.Vector2(), INTERSECTED;
    var radius = 500, theta = 0;
    var frustumSize = 4000;
    var theta2 = 0.01;

    var mouseX = 0, mouseY = 0;



    init();
    animate();

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function init() {
      var scene3d = document.getElementById("test-container");
      container = document.createElement( 'div' );
      document.body.appendChild( container );

      var aspect = window.innerWidth / window.innerHeight;
      camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 5000 );

      scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );

      var light = new THREE.DirectionalLight( 0xffffff, 100 );
      light.position.set( 1, 1, 1 ).normalize();
      scene.add( light );

      var cubeMat = new THREE.MeshLambertMaterial({ color: 0xffffff });

      var normMat = new THREE.MeshNormalMaterial();


      var material = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1 });

      var envMap = new THREE.TextureLoader().load("https://miro.medium.com/max/512/1*rUxJt0LnuVviT6dxiQmkMg.png");
      envMap.mapping = THREE.SphericalReflectionMapping;
      material.envMap = envMap;
      var roughnessMap = new THREE.TextureLoader().load("https://miro.medium.com/max/32/1*8tceByWLtVrvXDeRPA75QA.png");
      roughnessMap.magFilter = THREE.NearestFilter;
      material.roughnessMap = roughnessMap;
      roughnessMap.magFilter = THREE.NearestFilter;
      material.roughnessMap = roughnessMap;


      var loader = new THREE.FontLoader();
  loader.load(
    "https://raw.githubusercontent.com/rollup/three-jsnext/master/examples/fonts/helvetiker_bold.typeface.json",
    function(res) {



      for (var x = 0; x < 750; x ++){
        var number = getRandomInt(10);
        var numberString = number.toString();

        textGeo = new THREE.TextGeometry(numberString, {
          font: res,
          size: 50,
          height:8,
          curveSegments: 4
        });

        text = new THREE.Mesh(textGeo, material);

        text.position.x = Math.random() * 2000 - 1000;
        text.position.y = Math.random() * 2000 - 1000;
        text.position.z = Math.random() * 2000 - 1000;

         text.rotation.x = Math.random() * 2 * Math.PI;
        text.rotation.y = Math.random() * 2 * Math.PI;
        text.rotation.z = Math.random() * 2 * Math.PI;

        text.scale.x = Math.random() + 0.5;
        text.scale.y = Math.random() + 0.5;
        text.scale.z = Math.random() + 0.5;
        text.castShadow = false;
        scene.add(text);
      }

    }
  );

      raycaster = new THREE.Raycaster();

      renderer =  new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( window.innerWidth, window.innerHeight );
      scene3d.appendChild( renderer.domElement );


      document.addEventListener( 'mousemove', onDocumentMouseMove, false );

      //

      window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

      var aspect = window.innerWidth / window.innerHeight;

      camera.left = - frustumSize * aspect / 2;
      camera.right = frustumSize * aspect / 2;
      camera.top = frustumSize / 2;
      camera.bottom = - frustumSize / 2;

      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onDocumentMouseMove( event ) {

      event.preventDefault();

      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      mouseX = ( event.clientX)/20;
			mouseY = ( event.clientY)/20;

      scene.traverse( function( node ) {
        if ( node instanceof THREE.Mesh ) {
          node.scale.x = mouseX/14;
          node.scale.y = mouseX/14;

        }
      } );

    }

    function animate() {
      requestAnimationFrame( animate );
      render();
    }

    function render() {

      scene.traverse( function( node ) {
        if ( node instanceof THREE.Mesh ) {
          node.rotation.x += theta2*2;
        }
      } );

      theta += 0.00005; //radians
      var convertValue = .4533;
      var converted = theta/convertValue;

      // camera.position.x = radius *Math.sin(converted);
      // camera.position.y = radius *Math.cos(converted);
      // camera.position.z = radius ;

      camera.position.x += ( mouseX - camera.position.x ) * .1105;
			camera.position.y += ( mouseY - camera.position.y ) * .1105;
      camera.position.z = 10;
      camera.lookAt( scene.position );

      camera.updateMatrixWorld();

      renderer.render( scene, camera );

    }

console.log('changed to 1000');



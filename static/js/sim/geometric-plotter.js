window.onload = function() {
  var scene, camera, renderer;
  var controls;
  var options, gui;
  var info;

  var rotate_camera_increment = 0;
  var rotate_camera_radius = -1e10;

  init();
  animate();

  function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.position = new THREE.Vector3(0, 0, 0);

    var SimulationOptions = function() {
      this.x_axis_rotation = true;
      this.rotate_camera = false;
      this.a = -2;
      this.b = 2;
      this.x_increments = 20;
      this.y_increments = 20;
      this.axis = 0;
      this.functions = 'y=x';
    };

    options = new SimulationOptions();
    gui = new dat.GUI();
    var changeFunction = function(newValue) {
      rotate_camera_radius = -1e10;
      if (options.x_axis_rotation) {
        resetXAxisRotation();
      } else {
        resetYAxisRotation();
      }
    };

    gui.add(options, 'functions').onChange(changeFunction);
    gui.add(options, 'a', -50, 50).step(0.5).onChange(changeFunction);
    gui.add(options, 'b', -50, 50).step(0.5).onChange(changeFunction);
    gui.add(options, 'axis', -50, 50).step(0.5).onChange(changeFunction);
    gui.add(options, 'x_increments', 0, 100).step(1).onChange(changeFunction);
    gui.add(options, 'y_increments', 0, 100).step(1).onChange(changeFunction);
    gui.add(options, 'x_axis_rotation').onChange(changeFunction);
    gui.add(options, 'rotate_camera').onChange(function(newValue) {
      if (newValue) {
        rotate_camera_increment = 0;
      }
    });

    resetXAxisRotation();

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 4 + Math.max(Math.abs(options.a - options.axis), Math.abs(options.b - options.axis)) + 4 * Math.log(rotate_camera_radius);

    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
  }

  function at(func, x) {
    return eval(func);
  }

  function getRandomColor() {
    var letters = '89ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  function resetScene() {
    for (var i = scene.children.length - 1; i >= 0; i--) {
      obj = scene.children[i];
      scene.remove(obj);
    }

    var axisColors = [0x00ff00, 0xff0000, 0x0000ff];
    var axisVertices = [
      [new THREE.Vector3(-100000, 0, 0), new THREE.Vector3(100000, 0, 0)],
      [new THREE.Vector3(0, -100000, 0), new THREE.Vector3(0, 100000, 0)],
      [new THREE.Vector3(0, 0, -100000), new THREE.Vector3(0, 0, 100000)]
    ];

    for (var axis = 0; axis < 3; axis++) {
      var axisMaterial = new THREE.LineBasicMaterial({
        color: axisColors[axis],
        opacity: 0.6,
        transparent: true
      });
      var axisGeometry = new THREE.Geometry();
      axisGeometry.vertices.push(axisVertices[axis][0]);
      axisGeometry.vertices.push(axisVertices[axis][1]);
      scene.add(new THREE.Line(axisGeometry, axisMaterial));
    }
  }

  // Fix splining process
  function resetYAxisRotation() {
    resetScene();

    var prefuncs = options.functions.split(';');
    var funcs = {};
    for (var i in prefuncs) {
      var func = prefuncs[i].split(' ').join('').split('y=').join('');
      funcs[func] = getRandomColor();
    }

    for (var f in funcs) {
      if (Object.hasOwnProperty(f)) {
        continue;
      }
      var ymin = options.a < options.b ? options.a : options.b;
      var ymax = options.a > options.b ? options.a : options.b;
      var color = funcs[f];

      var x_start, x_end;
      var x_start_found = false;

      /*
      var precision = function(x_previous, x_next) {
          var y_previous = at(f, x_previous);
          var y_previous_bounded = y_previous >= ymin && y_previous <= ymax;
          var y_next = at(f, x_next);
          var y_next_bounded = y_next >= ymin && y_next <= ymax;
          var x_half = (x_previous + x_next) / 2;
          var y_half = at(f, x_half);
          var y_half_bounded = y_half >= ymin && y_half <= ymax;
          if (Math.abs(x_previous - x_next) < 0.001) {
              return x_half;
          }
          else if (y_previous_bounded !== y_half_bounded) {
              return precision(x_previous, x_half);
          }
          else if (y_half_bounded !== y_next_bounded) {
              return precision(x_half, x_next);
          }
          return x_half;
      }
      */

      for (var x = -50; x <= 50; x += 0.1) {
        var y = at(f, x);
        if (y >= ymin && y <= ymax) {
          if (!x_start_found) {
            x_start = x;
            x_start_found = true;
          }
          x_end = x;
        }
      }

      var x_increment = (x_end - x_start) / (options.y_increments + 1);
      for (var x = x_start; x <= x_end + x_increment / 2; x += x_increment) {
        var y = at(f, x);
        var radius = Math.abs(x - options.axis),
          segments = 64,
          material = new THREE.LineBasicMaterial({
            color: color
          }),
          geometry = new THREE.CircleGeometry(radius, segments);

        if (radius > rotate_camera_radius)
          rotate_camera_radius = radius;

        geometry.vertices.shift();

        if (radius > 0) {
          var line = new THREE.Line(geometry, material);
          line.position.set(options.axis, y, 0);
          line.rotation.x += Math.PI / 2;
          scene.add(line);
        }
      }

      var pts = [];

      for (var x = x_start; x <= x_end; x += x_increment / 10) {
        var y = at(f, x);
        pts.push(new THREE.Vector3(x, y, 0));
      }

      for (var deg = 0; deg < 2 * Math.PI; deg += 2 * Math.PI / (options.x_increments + 1)) {

        var spline = new THREE.CatmullRomCurve3(pts);
        var material = new THREE.LineBasicMaterial({
          color: color
        });
        var geometry = new THREE.Geometry();

        var splinePoints = spline.getPoints(Math.round(9 * (x_end - x_start) + 100));

        for (var i in splinePoints) {
          geometry.vertices.push(splinePoints[i]);
        }
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0 - options.axis, 0, 0));

        var pivot = new THREE.Object3D();
        pivot.add(new THREE.Line(geometry, material));

        pivot.position.x = options.axis;
        pivot.rotation.y += deg;
        scene.add(pivot);
      }
    }

  }

  function resetXAxisRotation() {
    resetScene();

    var prefuncs = options.functions.split(';');
    var funcs = {};
    for (var i in prefuncs) {
      var func = prefuncs[i].split(' ').join('').split('y=').join('');
      funcs[func] = getRandomColor();
    }

    for (var f in funcs) {

      var x_start = options.a < options.b ? options.a : options.b;
      var x_end = options.a > options.b ? options.a : options.b;
      var x_increment = (x_end - x_start) / (options.x_increments + 1);

      if (Object.hasOwnProperty(f)) {
        continue;
      }
      var color = funcs[f];
      for (var x = x_start; x <= x_end + x_increment / 2; x += x_increment) {
        var radius = Math.abs(at(f, x) - options.axis),
          segments = 64,
          material = new THREE.LineBasicMaterial({
            color: color
          }),
          geometry = new THREE.CircleGeometry(radius, segments);

        if (radius > rotate_camera_radius)
          rotate_camera_radius = radius;

        geometry.vertices.shift();

        if (radius > 0) {
          var line = new THREE.Line(geometry, material);
          line.position.set(x, options.axis, 0);
          line.rotation.y += Math.PI / 2;
          scene.add(line);
        }
      }

      var pts = [];

      for (var x = x_start; x <= x_end; x += x_increment / 10) {
        var y = at(f, x);
        if (y > rotate_camera_radius)
          y = rotate_camera_radius;
        if (!isNaN(y))
          pts.push(new THREE.Vector3(x, y, 0));
      }

      for (var deg = 0; deg < 2 * Math.PI; deg += 2 * Math.PI / (options.y_increments + 1)) {

        var spline = new THREE.CatmullRomCurve3(pts);
        var material = new THREE.LineBasicMaterial({
          color: color
        });
        var geometry = new THREE.Geometry();

        var splinePoints = spline.getPoints(Math.round(9 * (x_end - x_start) + 100));

        for (var i in splinePoints) {
          geometry.vertices.push(splinePoints[i]);
        }
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0 - options.axis, 0));

        var pivot = new THREE.Object3D();
        pivot.add(new THREE.Line(geometry, material));

        pivot.position.y = options.axis;
        pivot.rotation.x += deg;
        scene.add(pivot);
      }
    }
  }

  function animate() {
    controls.update();

    if (options.rotate_camera) {
      var rotate_radius = Math.max(Math.abs(options.a - options.axis), Math.abs(options.b - options.axis)) + 4 * Math.log(rotate_camera_radius);
      if (options.x_axis_rotation) {
        var rotate_around = new THREE.Vector3(0, options.axis, 0);
        camera.lookAt(rotate_around);
        camera.position.set(Math.sin(rotate_camera_increment) * rotate_radius, options.axis, Math.cos(rotate_camera_increment) * rotate_radius);
      } else {
        var rotate_around = new THREE.Vector3(options.axis, 0, 0);
        camera.lookAt(rotate_around);
        camera.position.set(options.axis, Math.cos(rotate_camera_increment) * rotate_radius, Math.sin(rotate_camera_increment) * rotate_radius);
      }
      rotate_camera_increment += 0.01;
    }

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }
};

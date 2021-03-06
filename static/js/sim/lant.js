function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

window.onload = function() {
  var reset = false;
  var iterations = 0;
  var LangtonsAntOptions = function() {
    this.rule = 'LRDU'; // RRLDDDULRRLLLL
    this.speed = 1;
    this.reset = function() {
      reset = true;
    }
  };

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);

  document.body.appendChild(renderer.domElement);

  var options = new LangtonsAntOptions();
  var gui = new dat.GUI();
  gui.add(options, 'rule');
  gui.add(options, 'speed', 0, 1).step(1);
  gui.add(options, 'reset');

  init();

  function init() {

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.position = new THREE.Vector3(0, 0, 0);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -30;

    var cells = {};
    for (var i = -100; i < 100; i++) {
      var cells_y = {};
      for (var j = -100; j < 100; j++) {
        var cells_z = {};
        for (var k = -100; k < 100; k++) {
          cells_z[k] = 0;
        }
        cells_y[j] = cells_z;
      }
      cells[i] = cells_y;
    }
    var position = new THREE.Vector3(0, 0, 0);
    cells[0][0][0] = 1;
    var direction = new THREE.Vector3(0, 0, 1);
    var normal = new THREE.Vector3(0, 1, 0);

    var id = requestAnimationFrame(animate);
    var running = true;
    var rule = options.rule;

    function animate() {
      if (reset) {
        cancelAnimationFrame(id);
        for (var i = scene.children.length - 1; i >= 0; i--) {
          obj = scene.children[i];
          scene.remove(obj);
        }
        cells = {};
        for (var i = -100; i < 100; i++) {
          var cells_y = {};
          for (var j = -100; j < 100; j++) {
            var cells_z = {};
            for (var k = -100; k < 100; k++) {
              cells_z[k] = 0;
            }
            cells_y[j] = cells_z;
          }
          cells[i] = cells_y;
        }
        color = 0xf5f5dc;
        position = new THREE.Vector3(0, 0, 0);
        cells[0][0][0] = 1;
        direction = new THREE.Vector3(0, 0, 1);
        normal = new THREE.Vector3(0, 1, 0);
        reset = false;
        id = requestAnimationFrame(animate);
        rule = options.rule;
        iterations = 0;
        running = true;
      }
      if (!reset && running) {
        for (var i = 0; i < options.speed; i++) {
          var old_position = position;
          var new_position = position.clone().add(direction);

          var start_color = [0, 255, 0];
          var end_color = [255, 0, 0];
          var current;
          if (iterations > 10000) {
            current = end_color;
          } else {
            current = [];
            for (var i in start_color) {
              current.push(Math.floor(start_color[i] + (end_color[i] - start_color[i]) * iterations / 10000.0));
            }
          }
          var current_hex_string = rgbToHex(current[0], current[1], current[2]);
          var current_color = parseInt(current_hex_string.replace(/^#/, ''), 16);
          var material = new THREE.LineBasicMaterial({
            color: current_color
          });
          var geometry = new THREE.Geometry();
          geometry.vertices.push(old_position);
          geometry.vertices.push(new_position);

          var line = new THREE.Line(geometry, material);
          scene.add(line);

          if (new_position.x > 100 ||
            new_position.x < -100 ||
            new_position.y > 100 ||
            new_position.y < -100 ||
            new_position.z > 100 ||
            new_position.z < -100
          ) {
            running = false;
            break;
          }

          // Change direction
          var c = rule.charAt(cells[new_position.x][new_position.y][new_position.z] % rule.length);
          if (c === 'L') {
            direction = direction.clone().cross(normal);
          } else if (c === 'R') {
            direction = direction.clone().cross(normal).negate();
          } else if (c === 'U') {
            var tmp = direction;
            direction = normal;
            normal = tmp.negate();
          } else if (c === 'D') {
            var tmp = normal;
            normal = direction;
            direction = tmp.negate();
          }

          cells[new_position.x][new_position.y][new_position.z] += 1

          position = new_position;

          iterations++;
        }
      }

      controls.update();

      renderer.render(scene, camera);

      id = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
  }
};

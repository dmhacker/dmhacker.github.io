window.onload = function() {
  var scene, camera, renderer;
  var controls;
  var options, gui;
  var info;

  init();
  animate();

  function init() {

    info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.zIndex = 1;
    info.style.color = "white";
    info.style.top = 150 + 'px';
    info.style.left = 10 + 'px';
    document.body.appendChild(info);

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
      this.layers = "[1, 3, 4, 3, 1]";
      this.training_set = "[[[0.1], [0.01]], [[0.2], [0.04]], [[0.4], [0.16]], [[1], [1]], [[0], [0]], [[-0.3], [0.09]], [[-0.5], [0.25]], [[-1], [1]], [[-0.7], [0.49]], [[0.6], [0.36]], [[0.7], [0.49]], [[0.9], [0.81]]]";
      this.inputs = "[0.1]";
      this.epochs = 6000;
      this.learning_rate = 0.7;
      this.momentum = 0.9;
      this.anneal_learning_rate = true;
      this.reset = reset;
    };

    options = new SimulationOptions();
    gui = new dat.GUI();
    gui.add(options, 'layers');
    gui.add(options, 'training_set');
    gui.add(options, 'inputs');
    gui.add(options, 'epochs', 1000, 10000).step(100);
    gui.add(options, 'learning_rate', 0.1, 1.0);
    gui.add(options, 'anneal_learning_rate');
    gui.add(options, 'reset');

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 150;

    reset();

    window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
  }

  var layers, training_set;
  var epochs, target_epochs;
  var learning_rate, anneal_learning_rate;

  var neurons;
  var bias_neurons;

  var neuronal_outputs, delta_outputs;

  var neural_error;

  var neuron_spheres;
  var bias_neuron_spheres;
  var neural_connection_lines;
  var bias_neural_connection_lines;

  function random_weight() {
    return Math.random() * 2 - 1;
  }

  function reset() {
    for (var i = scene.children.length - 1; i >= 0; i--) {
      obj = scene.children[i];
      scene.remove(obj);
    }

    neurons = [];
    bias_neurons = [];
    layers = JSON.parse(options.layers);
    training_set = JSON.parse(options.training_set);
    epochs = 0;
    target_epochs = options.epochs;
    learning_rate = options.learning_rate;
    anneal_learning_rate = options.anneal_learning_rate;

    for (var i = 1; i < layers.length; i++) {
      var neuron_layer = [];
      var num_neurons = layers[i];
      var num_previous_neruons = layers[i - 1];
      for (var j = 0; j < num_neurons; j++) {
        var neuron = [];
        for (var k = 0; k < num_previous_neruons; k++) {
          neuron.push(random_weight());
        }
        neuron_layer.push(neuron);
      }
      neurons.push(neuron_layer);

      var bias_layer = [];
      for (var j = 0; j < num_neurons; j++) {
        bias_layer.push(random_weight());
      }
      bias_neurons.push(bias_layer);
    }

    neural_error = backpropogate(training_set, 1);

    var x_min_distance = -100;
    var x_max_distance = 100;
    var x_separation_distance = (x_max_distance - x_min_distance) / (layers.length + 1);

    var y_min_distance = -100;
    var y_max_distance = 100;

    neuron_spheres = [];
    bias_neuron_spheres = [];

    for (var layer = 0; layer < layers.length; layer++) {
      var num_neurons = layers[layer];
      var y_separation_distance = y_max_distance - y_min_distance;
      if (layer < layers.length - 1) {
        y_separation_distance /= (num_neurons + 2);
      } else {
        y_separation_distance /= (num_neurons + 1);
      }
      var x = x_min_distance + x_separation_distance * (layer + 1);
      var layer_spheres = [];
      for (var i = 0; i < num_neurons; i++) {
        var geometry = new THREE.SphereGeometry(5, 32, 32);
        var material = new THREE.MeshBasicMaterial({
          color: 0xffffff
        });
        var sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        sphere.position.set(x, y_max_distance - y_separation_distance * (i + 1), 0);
        layer_spheres.push(sphere);
      }
      neuron_spheres.push(layer_spheres);

      if (layer < layers.length - 1) {
        var geometry = new THREE.SphereGeometry(4, 32, 32);
        var material = new THREE.MeshBasicMaterial({
          color: 0xff0000
        });
        var sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        sphere.position.set(x, y_max_distance - y_separation_distance * (num_neurons + 1), 0);
        bias_neuron_spheres.push(sphere);
      }
    }

    neural_connection_lines = [];
    bias_neural_connection_lines = [];

    for (var i = 0; i < neurons.length; i++) {
      var neuron_layer = neurons[i];
      var bias_layer = bias_neurons[i];
      var neuron_layer_lines = [];
      var bias_layer_lines = [];
      for (var j = 0; j < neuron_layer.length; j++) {
        var neuron = neuron_layer[j];
        var neuron_lines = [];
        var current_layer_sphere = neuron_spheres[i + 1][j];
        for (var k = 0; k < neuron.length; k++) {
          var previous_layer_sphere = neuron_spheres[i][k];

          var material = new THREE.LineBasicMaterial({
            transparent: true
          });
          var geometry = new THREE.Geometry();
          geometry.vertices.push(previous_layer_sphere.position);
          geometry.vertices.push(current_layer_sphere.position);

          var line = new THREE.Line(geometry, material);
          scene.add(line);
          line.material.opacity = Math.abs(neuron[k]);

          neuron_lines.push(line);
        }
        neuron_layer_lines.push(neuron_lines);

        var bias_weight = bias_layer[j];
        var previous_bias_sphere = bias_neuron_spheres[i];

        var material = new THREE.LineBasicMaterial({
          transparent: true
        });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(previous_bias_sphere.position);
        geometry.vertices.push(current_layer_sphere.position);

        var line = new THREE.Line(geometry, material);
        scene.add(line);
        line.material.opacity = Math.abs(bias_weight);
        line.material.color.setHex(0xff0000);

        bias_layer_lines.push(line);
      }
      neural_connection_lines.push(neuron_layer_lines);
      bias_neural_connection_lines.push(bias_layer_lines);
    }
  }

  function feed_forward(inputs) {
    var local_input_vector = inputs;

    neuronal_outputs = [local_input_vector];

    // For each neuronal layer, we take the input vector (from the previous layer) and transform it.
    for (var i = 0; i < neurons.length; i++) {
      var neuron_layer = neurons[i];
      var bias_layer = bias_neurons[i];
      var local_output_vector = [];
      // For each neuron, we multiply each of its weights by the input vector value
      for (var j = 0; j < neuron_layer.length; j++) {
        var neuron = neuron_layer[j];
        var s = 1 * bias_layer[j]; // Start with bias weight (obviously multiplied by 1)
        for (var k = 0; k < local_input_vector.length; k++) {
          s += local_input_vector[k] * neuron[k];
        }
        var activation = Math.tanh(s);
        local_output_vector.push(activation);
      }
      neuronal_outputs.push(local_output_vector);
      local_input_vector = local_output_vector;
    }

    return local_input_vector;
  }

  function backpropogate(training_data, num_epochs) {
    var error = 100;
    shuffleArray(training_data);
    for (var epoch = 0; epoch < num_epochs; epoch++) {
      error = 0;
      for (var t in training_data) {
        var training_datum = training_data[t];
        var inputs = training_datum[0];
        var targets = training_datum[1];
        var outputs = feed_forward(inputs);
        var delta_errors = [];
        for (var i in outputs) {
          var delta = targets[i] - outputs[i];
          var derivative = 1 - Math.pow(outputs[i], 2) + 0.1;
          var delta_error = derivative * delta;
          delta_errors.push(delta_error);
        }
        delta_outputs = [delta_errors];
        for (var layer = neurons.length - 1; layer >= 0; layer--) {
          var weights = neurons[layer];
          var delta_errors = [];
          for (var i = 0; i < layers[layer]; i++) {
            var sdelta = 0;
            for (var j = 0; j < layers[layer + 1]; j++) {
              var previous_delta_error = delta_outputs[0][j];
              var synaptic_weight = weights[j][i];
              sdelta += previous_delta_error * synaptic_weight;
            }
            var neuronal_output = neuronal_outputs[layer][i];
            var derivative = 1 - Math.pow(neuronal_output, 2);
            var delta_error = derivative * sdelta;
            delta_errors.push(delta_error);
          }
          delta_outputs.unshift(delta_errors);
        }
        for (var i = 0; i < neurons.length; i++) {
          var neuron_layer = neurons[i];
          var bias_layer = bias_neurons[i];
          for (var j = 0; j < neuron_layer.length; j++) {
            var neuron = neuron_layer[j];
            var delta_error = delta_outputs[i + 1][j];
            for (var k = 0; k < neuron.length; k++) {
              var neuronal_output = neuronal_outputs[i][k];
              neuron[k] = neuron[k] + learning_rate * delta_error * neuronal_output;
            }
            bias_layer[j] = bias_layer[j] + learning_rate * delta_error; // Neuronal output is always 1; definition of a bias node
          }
        }
        outputs = feed_forward(inputs);
        for (var i in outputs) {
          error += Math.pow(targets[i] - outputs[i], 2) / outputs.length;
        }
      }
      error /= training_data.length;
    }
    return error;
  }

  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function animate() {

    // Update every other repaint
    if (epochs < target_epochs) {
      neural_error = backpropogate(training_set, 10);
      if (anneal_learning_rate) {
        if (epochs % 100 == 0) {
          learning_rate -= 0.01;
        }
        if (learning_rate < 0.01) {
          learning_rate = 0.01;
        }
      }
      epochs += 10;
    }

    // Update lines
    for (var i = 0; i < neurons.length; i++) {
      var neuron_layer = neurons[i];
      var bias_neuron_layer = bias_neurons[i];
      for (var j = 0; j < neuron_layer.length; j++) {
        var neuron = neuron_layer[j];
        for (var k = 0; k < neuron.length; k++) {
          var line = neural_connection_lines[i][j][k];
          line.material.opacity = Math.abs(neuron[k]);
        }
        var bias_line = bias_neural_connection_lines[i][j];
        bias_line.material.opacity = Math.abs(bias_neuron_layer[j]);
      }
    }

    var text = "<b>Epoch:</b><br>" + epochs + "<br><br><b>Error:</b><br>" + neural_error;

    try {
      var sample_inputs = JSON.parse(options.inputs);
      var sample_outputs = feed_forward(sample_inputs);
      text += "<br><br><b>Output:</b><br>" + JSON.stringify(sample_outputs);
    } catch (e) {
      // Syntax error, ignore
    }

    info.innerHTML = text;

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

}

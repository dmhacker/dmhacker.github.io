Array.prototype.sum = function (arr) {
  return this.map(function (num, idx) {
    return num + arr[idx];
  });
}

$(document).ready(function() {
  // Set up some game and display variables
  var board,
    game = new Chess(),
    saved_moves = [],
    unsaved_count = 0;

  // Important jQuery elements
  var fenEl = $('#fen'),
    pgnEl = $('#pgn'),
    pgnSubmitEl = $('#pgnSubmit'),
    infoEl = $('#info'),
    backEl = $('#back'),
    forwardEl = $('#forward'),
    resetEl = $('#reset');

  // Extract canvas element(s) without jQuery
  var canvas = document.getElementById('heatmap');
  var context = canvas.getContext("2d");
  var canvas_width = canvas.width;
  var canvas_height = canvas.height;
  var box_width = 100; 
  var box_height = 100; 

  // Block dragging if game is over or it isn't that player's turn
  var onDragStart = function(source, piece, position, orientation) {
    if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false;
    }
  };

  // Handles when a chess piece is dropped
  var onDrop = function(source, target) {
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // TODO: Allow adjustable promotion 
    });

    if (move === null) {
      return 'snapback';
    }

    // Note that the user has made their own move that will not be saved
    unsaved_count++;


    updateLabels();
  };

  // Position is updated once the pieces have been placed (no snapback)
  var updateBoard = function() {
    board.position(game.fen());
  };

  // Responsible for updating labels that aren't part of the actual chessboard 
  var updateLabels = function() {
    var move_number = Math.ceil((game.history().length + 1) / 2);

    // Add information about the state of the game & the move number
    if (game.in_draw()) {
      infoEl.html('The game is drawn at move ' + move_number + '.');
    }
    else if (game.in_stalemate()) {
      infoEl.html('The game ended in stalemate at move ' + move_number + '.');
    }
    else if (game.in_checkmate()) {
      var opposing = game.turn() === 'b' ? 'White' : 'Black';
      infoEl.html(opposing + ' won at move ' + move_number + '.');
    }
    else {
      var color = game.turn() === 'b' ? 'Black' : 'White';
      infoEl.html('It is move ' + move_number + '. ' + color + ' is up.'); 
    }

    // Add a note about the saved position if the user has made some moves of their own
    if (unsaved_count) {
      var unsaved_total = game.history().length - unsaved_count;
      var saved_move_number = Math.ceil((unsaved_total + 1) / 2);
      var saved_color = unsaved_total % 2 == 0 ? 'white' : 'black';
      infoEl.html(infoEl.html() + '<br/><span style="color:red">Saved position at #' + saved_move_number  + ', ' + saved_color  + ' to move.</span>');
      fenEl.html('<span style="color:red">' + game.fen() + '</span>');
    }
    else {
      fenEl.html(game.fen());
    }

    // Redraw the heatmap
    updateCanvas();
  };

  var drawSquare = function(x_corner, y_corner, color) {
    context.fillStyle = color; 
    context.fillRect(x_corner + 2, y_corner + 2, box_width - 2, box_height - 2);
  }

  var drawGrid = function() {
    // Draw the vertical grid lines
    for (var x = 1; x < canvas_width; x += box_width) {
      context.moveTo(x, 0);
      context.lineTo(x, canvas_height);
    }

    // Draw the horizontal grid lines
    for (var y = 1; y < canvas_height; y += box_height) {
      context.moveTo(0, y);
      context.lineTo(canvas_width, y);
    }

    // Grid lines are colored black
    context.strokeStyle = "black";
    context.stroke();
  }

  var updateCanvas = function() {
    // Grid is used to keep track of which pieces control which squares 
    var grid = [];

    // Layout of the game board
    var layout = [];

    // A list of all of the active pieces on the board
    var pieces = []; 

    // Fill all arrays in one nested loop
    for (var i = 0; i < 8; i++) {
      var row = [];
      var rank = [];
      for (var j = 0; j < 8; j++) {
        var piece = game.get(game.SQUARES[i * 8 + j]);
        row.push([0, 0]); 
        rank.push(piece);

        if (piece != null) {
          pieces.push([i, j]);
        }
      }
      grid.push(row);
      layout.push(rank);
    }

    // Test if a position is within the game boundaries
    var isOnBoard = function(position) {
      return position[0] >= 0 && position[1] >= 0 && position[0] < 8 && position[1] < 8;
    }

    for (var piece_idx = 0; piece_idx < pieces.length; piece_idx++) {
      var position = pieces[piece_idx];
      var piece = layout[position[0]][position[1]];

      // Set up the directions that the pieces can move in
      var dirs;
      if (piece.type === game.PAWN) {
        if (piece.color === game.BLACK) {
          dirs = [[1, 1], [1, -1]];
        }
        else {
          dirs = [[-1, 1], [-1, -1]];
        }
      }
      else if (piece.type == game.KNIGHT) {
        dirs = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
      }
      else if (piece.type == game.BISHOP) {
        dirs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      }
      else if (piece.type == game.ROOK) {
        dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      }
      else {
        dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
      }

      if (piece.type === game.PAWN || piece.type === game.KNIGHT || piece.type == game.KING) {
        // Pawns, knights, and kings can only move once in their given directions
        for (var di = 0; di < dirs.length; di++) {
          var result = position.sum(dirs[di]);
          if (isOnBoard(result)) {
            grid[result[0]][result[1]][piece.color === game.BLACK ? 1 : 0] += 1;
          }
        }
      }
      else {
        // Rooks, bishops, and queens can move any amount of squares in their given directions
        for (var di = 0; di < dirs.length; di++) { 
          var step = dirs[di]; 
          while (true) {
            var result = position.sum(step);
            if (isOnBoard(result)) {
              grid[result[0]][result[1]][piece.color === game.BLACK ? 1 : 0] += 1;
              if (layout[result[0]][result[1]] == null) {
                step = step.sum(dirs[di]);
              }
              else {
                break;
              }
            }
            else {
              break;
            }
          }
        }
      }
    }

    // Use grid 2D array to fill in the heatmap 
    var whiteDefault = '#ffbfbf';
    var blackDefault = '#bfbfff';
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var control = grid[i][j];
        var whiteScaled = chroma(whiteDefault).darken(control[0]).hex();
        var blackScaled = chroma(blackDefault).darken(control[1]).hex();
        if (control[0] != 0 && control[1] != 0) {
          drawSquare(j * 100, i * 100, chroma.mix(whiteScaled, blackScaled, 0.5).hex());
        }
        else if (control[0] != 0) {
          drawSquare(j * 100, i * 100, whiteScaled); 
        }
        else if (control[1] != 0) {
          drawSquare(j * 100, i * 100, blackScaled); 
        }
        else {
          drawSquare(j * 100, i * 100, 'white');
        }
      }
    }
  };

  var back = function() {
    if (unsaved_count) {
      toastr.warning("Reset the game board to your last saved position before attempting to go back.");
      return;
    }

    var undone_move = game.undo();
    if (undone_move != null) {
      saved_moves.push(undone_move);

      updateLabels();
      updateBoard();
    }
  };

  var forward = function() {
    if (unsaved_count) {
      toastr.warning("Reset the game board to your last saved position before attempting to go forward.");
      return;
    }

    if (saved_moves.length > 0) {
      game.move(saved_moves.pop());

      updateLabels();
      updateBoard();
    }
  };

  var reset = function() {
    if (unsaved_count) {
      while (unsaved_count > 0) {
        game.undo();  
        unsaved_count--;
      }

      updateLabels();
      updateBoard();
    }
  }

  // Button presses 
  backEl.on('click', back);
  forwardEl.on('click', forward);
  resetEl.on('click', reset);

  // Key presses
  $(document).keydown(function (e) {
    if (e.keyCode === 37 || e.key === 'a') {
      back();
    }
    else if (e.keyCode === 39 || e.key === 'd') {
      forward();
    }
    else if (e.key === 'r') {
      reset(); 
    }
  });

  // A new PGN has been entered into the textbox 
  pgnSubmitEl.on('click', function (e) {
    // Load the PGN into the chess game object
    game.load_pgn(pgnEl.val());    

    // Clear any saved variables 
    saved_moves.length = 0;
    unsaved_count = 0;

    // Update the position on the board
    updateLabels();
    updateBoard(); 
  });

  // Create a chessboard display with all of the pieces set to their default positions 
  var board_config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: updateBoard,
    pieceTheme: '../../static/img/chesspieces/{piece}.png'
  };
  board = ChessBoard('board', board_config);

  // Display initial game status, etc.
  drawGrid();
  updateLabels();
}); 



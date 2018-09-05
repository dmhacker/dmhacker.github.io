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
    moveEl = $('#move'),
    backEl = $('#back'),
    forwardEl = $('#forward'),
    resetEl = $('#reset');

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


    onBoardUpdate();
  };

  // Position is updated once the pieces have been placed (no snapback)
  var onSnapEnd = function() {
    board.position(game.fen());
  };

  // Responsible for updating labels that aren't part of the actual chessboard 
  var onBoardUpdate = function() {
    var move_number = Math.ceil((game.history().length + 1) / 2);

    // Add information about the state of the game & the move number
    if (game.in_draw()) {
      moveEl.html('The game is drawn at move ' + move_number + '.');
    }
    else if (game.in_stalemate()) {
      moveEl.html('The game ended in stalemate at move ' + move_number + '.');
    }
    else if (game.in_checkmate()) {
      var opposing = game.turn() === 'b' ? 'White' : 'Black';
      moveEl.html(opposing + ' won at move ' + move_number + '.');
    }
    else {
      var color = game.turn() === 'b' ? 'Black' : 'White';
      moveEl.html('It is move ' + move_number + '. ' + color + ' is up.'); 
    }

    // Add a note about the saved position if the user has made some moves of their own
    if (unsaved_count) {
      var unsaved_total = game.history().length - unsaved_count;
      var saved_move_number = Math.ceil((unsaved_total + 1) / 2);
      var saved_color = unsaved_total % 2 == 0 ? 'white' : 'black';
      moveEl.html(moveEl.html() + '<br/><span style="color:red">Saved position at #' + saved_move_number  + ', ' + saved_color  + ' to move.</span>');
      fenEl.html('<span style="color:red">' + game.fen() + '</span>');
    }
    else {
      fenEl.html(game.fen());
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
      onSnapEnd();
      onBoardUpdate();
    }
  };

  var forward = function() {
    if (unsaved_count) {
      toastr.warning("Reset the game board to your last saved position before attempting to go forward.");
      return;
    }

    if (saved_moves.length > 0) {
      game.move(saved_moves.pop());
      onSnapEnd();
      onBoardUpdate();
    }
  };

  var reset = function() {
    if (unsaved_count) {
      while (unsaved_count > 0) {
        game.undo();  
        unsaved_count--;
      }
      onSnapEnd();
      onBoardUpdate();
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
    onSnapEnd(); 
    onBoardUpdate();
  });

  // Create a chessboard display with all of the pieces set to their default positions 
  var board_config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    pieceTheme: '../../static/img/chesspieces/{piece}.png'
  };
  board = ChessBoard('board', board_config);

  // Display initial game status, etc.
  onBoardUpdate();
}); 

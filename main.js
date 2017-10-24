$(document).ready(function() {
  $(".winner-announcement").hide();
  $(".nowin-announcement").hide();
  $(".restart").hide();
  $(".move").hide();
  
  var player1;
  var player2;
  var currentMove;
  var currentPlayer;
  var allMoves = [];

  var mover = true;
  var winner = false;

  var player1Moves = [];
  var player2Moves = [];
  
  var counterX = 0; 
  var counterO = 0;

  //--select your player--//
  $("input").click(function() {
    player1 = $(this).val();
    $("input").attr("disabled", true); //prevents to change symbol while playing
    $(".move").show();
    $(".move").text("Player One moves");
    
    if (player1 === "x") {
      player2 = "o";
      $(".player2").html("Opponent: O");
      
    } else {
      player2 = "x";
      $(".player2").html("Opponent: X");
    }
  });

  
  
  //--tic tac toe functionality--//
  $("td").click(function() {
    if (mover === true) {
      $(this).text(player1);
      currentPlayer = "player1";
      currentMove = $(this).attr("value");
      $(".move").show().text("Opponent moves");
      
      if (allMoves.includes(currentMove)) {   //--prevent moves to be repeated--//
        currentPlayer = "player1";
        if (player1Moves.includes(currentMove)) {
          $(this).text(player1);
        } else {
          $(this).text(player2);
        }
        currentMove = "";
      } else {
        player1Moves.push(currentMove);
        allMoves.push(currentMove);
        mover = false;
        playerMove(player1Moves, player1);
        if (winner === false){
        noWin(allMoves);
        }
      }
    } else {
      $(this).text(player2);
      currentPlayer = "player2";
      currentMove = $(this).attr("value");
      $(".move").show().text("Player One Moves");

      if (allMoves.includes(currentMove)) {  //--prevent moves to be repeated--//
        currentPlayer = "player2";
        if (player2Moves.includes(currentMove)) {
          $(this).text(player2);
        } else {
          $(this).text(player1);
        }
        currentMove = "";
      } else {
        player2Moves.push(currentMove);
        allMoves.push(currentMove);
        mover = true;
        playerMove(player2Moves, player2);
        if (winner === false){
        noWin(allMoves);
        }
      }
    }
  });

  //Calculate Wins//
  function playerMove(arr, player) {
    var winning = [
      ["1", "2", "3"],
      ["1", "4", "7"],
      ["1", "5", "9"],
      ["2", "5", "8"],
      ["3", "6", "9"],
      ["3", "5", "7"],
      ["4", "5", "6"],
      ["7", "8", "9"]
    ];

    var temp = [];

    for (var z = 0; z < winning.length; z++) {
      if (
        arr.includes(winning[z][0]) &&
        arr.includes(winning[z][1]) &&
        arr.includes(winning[z][2])
      ) {
        temp.push(winning[z]);
      }
    }
    if (temp.length >= 1) {
      someWin(player);
    }
  }
  
  //restart on play again//
    $(".restart").click(function() {
    $("td").text("");
    $("td").css("border-color", "#1a1a1a");
  currentMove = "";
  currentPlayer = player1;
  allMoves = [];
  player1Moves = [];
  player2Moves = [];
  mover = true;
  winner = false;

  $("table").css("background-color", "#ccccff");
  $(".yourteam").show();    
  $(".nowin-announcement").hide();
  $(".winner-announcement").hide();
  $(".restart").hide();
  $(".move").show().text("Player One Moves");
  });
  
  
  
  //if someone wins//
  function someWin(player) {
    $(".yourteam").hide();
    $(".nowin-announcement").hide();
    $(".winner-announcement").show().text(player + " won!");
    $(".restart").show();
    $(".move").hide();
    mover = true;
    winner = true;
    if (player === "o"){
      counterO++;
      counter(counterX, counterO);
      $("td").css("border-color", "green");
    } else if (player === "x") {
      counterX++;
      counter(counterX, counterO);
      $("td").css("border-color", "yellow");
    }
  }

  
  
  //end of game with no win//
  function noWin() {
    if (allMoves.length === 9 && winner === false) {
      $("td").css("border-color", "red");
      $(".yourteam").hide();
      $(".winner-announcement").hide();
      $(".nowin-announcement").show();
      $(".restart").show();
      $(".move").hide();
      mover = true;
    }
  }

  function counter(counterX, counterO){
    $(".counter").text("X: " + counterX + " | O: " + counterO);
  }
  
  /* DO NOT DELETE -- END OF DOCUMENT READY */
});

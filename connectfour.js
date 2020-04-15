$("html").on("load", setPlayers());
enable();
var interval;
var obj = $("td");
var arr = $.makeArray(obj);
var table = $("table tr");
var colors = ["yellow", ]
var player1,
  player1Color,
  player2,
  player2Color;
var hori = false,
  verti = false,
  diag1 = false,
  diag2 = false;
var i = 0,
  curr = 0,
  n = 0;

//enables click function for tds' 0-6
function enable() {
  game = true;
  removeClick();
  resetAllValues();
  for (var i = 0; i < 7; i++) {
    $("td").eq(i).on("click", function () {
      $("td").eq(findBottom(arr.indexOf(this)));
    });
  }
}
//disables click function for tds' 0-6
function disable() {
  game = false;
  removeClick();
  $("#wins").text("Click Here to Restart Game");
  $("#wins").on("click", function () {
    enable();
  })
}

function removeClick() {
  for (var i = 0; i < 7; i++) {
    $("td").eq(i).off("click");
  }
}

function resetAllValues() {
  n = 0;
  resetSides();
  stopInterval();
  $("td").css("background-color", "rgba(0, 0, 0, 0)");
  $("#wins").html("Connect Four to win! <em>Horizontally, Vertically or Diagonally</em>");
  $("#popup").text(player1 + "'s turn drop Red Chip");
  for (var i = 0; i < 7; i++) {
    $("td").eq(i).off("click");
  }
}

function setPlayers() {
  player1 = prompt("Player 1: Enter Your Name!");
  player1Color = "rgb(255, 0, 0)";
  player2 = prompt("Player 2: Enter Your Name!");
  player2Color = "rgb(0, 0, 255)";
  $("#popup").text(player1 + " it is your turn, drop Red Chip");
}

function currentPlayer() {
  if (n == 0) {
    curr = 0;
    n++;
    $("#popup").html(player2 + "'s turn, drop Blue Chip");
    return player1Color;
  } else {
    curr++;
    n = 0;
    $("#popup").text(player1 + "'s turn, drop Red Chip");
    return player2Color;
  }
}

function getCurr() {
  if (curr == 0) return player2Color;
  else return player1Color;
}

function lastPlayerName() {
  if (n == 1) return player1;
  else return player2;
}

function lastPlayerColor() {
  if (n == 1) return player1Color;
  else return player2Color;
}
// finds the bottom element without color of the clicked td index from 0-6 (x)
// also checks for the winner when a player finishes turn
function findBottom(x) {
  for (var i = 0; i < 5; i++) {
    if (!hasColor(x + 7)) x += 7;
    else if (hasColor(x) && i == 0) {
      break;
    } else {
      $("td").eq(x).css("background-color", currentPlayer());
      checkWinner(checkHori(), checkVerti(), checkDiag1(), checkDiag2());
      return x;
    }
  }
}

function hasColor(x) {
  if ($("td").eq(x).css("background-color") === "rgba(0, 0, 0, 0)") {
    return false;
  }
  return true;
}

function checkHori() {
  for (var y = 0; y < 5; y++) {
    for (var x = 0; x < 4; x++) {
      var color = table.eq(y).find("td").eq(x).css("background-color");
      if (
        checkFour(
          table.eq(y).find("td").eq(x).css("background-color"),
          table.eq(y).find("td").eq(x + 1).css("background-color"),
          table.eq(y).find("td").eq(x + 2).css("background-color"),
          table.eq(y).find("td").eq(x + 3).css("background-color")
        )) {
        $("#popup").text(lastPlayerName() + " wins!");
        hori = true;
        change(color, y, x);
        return true;
      }
    }
  }
}

function checkVerti() {
  for (var y = 0; y < 2; y++) {
    for (var x = 0; x < 7; x++) {
      var color = table.eq(y).find("td").eq(x).css("background-color");
      if (
        checkFour(
          table.eq(y).find("td").eq(x).css("background-color"),
          table.eq(y + 1).find("td").eq(x).css("background-color"),
          table.eq(y + 2).find("td").eq(x).css("background-color"),
          table.eq(y + 3).find("td").eq(x).css("background-color")
        )) {
        $("#popup").text(lastPlayerName() + " wins!");
        verti = true;
        change(color, y, x);
        return true;
      }
    }
  }
}

// checks diagonal
function checkDiag1() {
  for (var y = 0; y < 2; y++) {
    for (var x = 0; x < 4; x++) {
      var color = table.eq(y).find("td").eq(x).css("background-color");
      if (
        checkFour(
          table.eq(y).find("td").eq(x).css("background-color"),
          table.eq(y + 1).find("td").eq(x + 1).css("background-color"),
          table.eq(y + 2).find("td").eq(x + 2).css("background-color"),
          table.eq(y + 3).find("td").eq(x + 3).css("background-color")
        )) {
        $("#popup").text(lastPlayerName() + " wins!");
        diag1 = true;
        change(color, y, x);
        return true;
      }
    }
  }
}

//checks inverted diagonal
function checkDiag2() {
  for (var y = 0; y < 2; y++) {
    for (var x = 3; x < 7; x++) {
      var color = table.eq(y).find("td").eq(x).css("background-color");
      if (
        checkFour(
          table.eq(y).find("td").eq(x).css("background-color"),
          table.eq(y + 1).find("td").eq(x - 1).css("background-color"),
          table.eq(y + 2).find("td").eq(x - 2).css("background-color"),
          table.eq(y + 3).find("td").eq(x - 3).css("background-color")
        )) {
        $("#popup").text(lastPlayerName() + " wins!");
        diag2 = true;
        change(color, y, x);
        return true;
      }
    }
  }
}

// checks four same color coded pieces
function checkFour(c1, c2, c3, c4) {
  if (c1 === c2 && c1 === c3 && c1 === c4 && c1 !== "rgba(0, 0, 0, 0)") {
    $("#popup").text(lastPlayerName() + " wins!");
    return true;
  }
  return false;
}

// h = horizontal, v = vertical ........
function checkWinner(h, v, d1, d2) {
  if (h === true || v === true || d1 === true || d2 === true) {
    return disable();
  }
}

function change(color, y, x) {
  interval = setInterval(function () {
    if (i == 0) {
      getTd(y, x);
    } else {
      getTd2(color, y, x);
    }
  }, 800);
}

function getTd(y, x) {
  i++;
  if (hori) {
    findHoriElements("yellow", y, x);
  } else if (verti) {
    findVertiElements("yellow", y, x);
  } else if (diag1) {
    findDiag1Elements("yellow", y, x);
  } else if (diag2) {
    findDiag2Elements("yellow", y, x);
  }

}

function getTd2(color, y, x) {
  i = 0;
  if (hori) {
    findHoriElements(color, y, x);
  } else if (verti) {
    findVertiElements(color, y, x);
  } else if (diag1) {
    findDiag1Elements(color, y, x);
  } else if (diag2) {
    findDiag2Elements(color, y, x);
  }
}

function findHoriElements(color, y, x) {
  table.eq(y).find("td").eq(x).css("background-color", color);
  table.eq(y).find("td").eq(x + 1).css("background-color", color);
  table.eq(y).find("td").eq(x + 2).css("background-color", color);
  table.eq(y).find("td").eq(x + 3).css("background-color", color);
}

function findVertiElements(color, y, x) {
  table.eq(y).find("td").eq(x).css("background-color", color);
  table.eq(y + 1).find("td").eq(x).css("background-color", color);
  table.eq(y + 2).find("td").eq(x).css("background-color", color);
  table.eq(y + 3).find("td").eq(x).css("background-color", color);
}

function findDiag1Elements(color, y, x) {
  table.eq(y).find("td").eq(x).css("background-color", color);
  table.eq(y + 1).find("td").eq(x + 1).css("background-color", color);
  table.eq(y + 2).find("td").eq(x + 2).css("background-color", color);
  table.eq(y + 3).find("td").eq(x + 3).css("background-color", color);
}

function findDiag2Elements(color, y, x) {
  table.eq(y).find("td").eq(x).css("background-color", color);
  table.eq(y + 1).find("td").eq(x - 1).css("background-color", color);
  table.eq(y + 2).find("td").eq(x - 2).css("background-color", color);
  table.eq(y + 3).find("td").eq(x - 3).css("background-color", color);
}

function stopInterval() {
  clearInterval(interval);
}

function resetSides() {
  hori = false;
  verti = false;
  diag1 = false;
  diag2 = false;
}
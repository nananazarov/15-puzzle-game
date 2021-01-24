// Import stylesheets
import "./css/style.css";

function getCookie(name) {
  var pattern = RegExp(name + "=.[^;]*");
  var matched = document.cookie.match(pattern);
  if (matched) {
    var cookie = matched[0].split("=");
    return cookie[1];
  }
  return false;
}

var s,
  count = 0,
  best = getCookie("best"),
  def = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""],
  sum = 0;
if (best != false || best != "") {
  document.getElementById("best").innerHTML = "Best<br>" + best;
}
function shuffle(array) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function row(ind) {
  return Math.trunc((ind + 4) / 4);
}

function col(ind) {
  let i = (ind + 1) % 4;
  if (i == 0) {
    i = 4;
  }
  return i;
}

function newGame() {
  count = 0;
  s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  shuffle(s);
  sum = 0;
  sum = sum + row(s.indexOf(16, 0)) - col(s.indexOf(16, 0));
  for (let m = 0; m < 15; m++) {
    for (let n = m + 1; n < 16; n++) {
      if (s[m] > s[n]) {
        sum++;
      }
    }
  }
  if (sum % 2 == 1) {
    console.log(s);
    if(s[0]!=16 && s[1]!=16){[s[0], s[1]] = [s[1], s[0]];}
    else{[s[2], s[3]] = [s[3], s[2]];}
    console.log(s);
  }
  s[s.indexOf(16, 0)] = "";
  return s;
}

function board(str) {
  document.getElementById("count").innerHTML = "Steps<br>" + count;
  document.getElementById("game").innerHTML = "";
  for (let m = 0; m < 16; m++) {
    let element = document.createElement("div");
    element.innerHTML = str[m];
    element.className = "cell";
    element.id = "c" + str[m];
    document.getElementById("game").appendChild(element);
  }
}

function win() {
  if (best == false) {
    best = count;
    document.cookie = `best=${best}; max-age=2592000; secure`;
  } else if (count < best) {
    best = count;
    document.cookie = `best=${best}; max-age=2592000; secure`;
  }
  if (best != false) {
    document.getElementById("best").innerHTML = "Best<br>" + best;
  }
  document.getElementById("winsign").style.visibility = "visible";
  console.log("Game over");
  board(def);
}

function move(cell) {
  let i = s.indexOf(cell, 0),
    l = s.indexOf("", 0),
    p = Math.abs(i - l),
    q = Math.abs(row(i) - row(l));
  if ((p == 1 && q == 0) || (p == 4 && q == 1)) {
    [s[i], s[l]] = [s[l], s[i]];
    count++;
    board(s);
    if (s.join() != def.join()) {
      clicked();
    } else {
      win();
    }
  }
}

newgame.onclick = function() {
  document.getElementById("winsign").style.visibility = "hidden";
  newGame();
  board(s);
  clicked();
  document.getElementById("newgame").blur();
};

function clicked() {
  var element = document.getElementsByClassName("cell");
  for (var i = 0; i < element.length; i++) {
    element[i].onclick = function(e) {
      let clicked = this.id.replace("c", "");
      if (clicked != "") {
        move(Number(clicked));
      }
    };
  }
}

board(def);

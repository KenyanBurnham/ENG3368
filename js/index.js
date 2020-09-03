
//usually you shouldn't render a funciton before an object constructor, but eh?
function rotate(){
  var degrees = [0, 1, 2, 3];
  var chosen = [];
    do {
    chosen = degrees.splice(
        Math.floor(Math.random() * degrees.length)
        , 1)[0];
  } while (chosen.length < 1);
  return chosen;
}

function Tile(cell, type, url) {
  //initializes as a "home" type
  // cell id
  this.cell = "a00";
  //initializes as a home tile.
  //Types range from 0-6
  this.type = 0;
  //0-3 indicates 0, 90, 180, and 270 degrees
  this.direction = rotate();
  //ul indicates where the icon comes from in the media folder
  this.url = "";
  this.isOption = true;
  this.isArrow = false;
  this.number = 0;
}

function createTileObject(){

  var Board = new Object();
  var tiles = new Array(70);

  var urlArray = [
      "media/home.png",
      "media/spin.png",
      "media/flip.png",
      "media/diagbrown.png",
      "media/diagtan.png",
      "media/orthbrown.png",
      "media/orthtan.png"];

  var type = new Array(68);
  for(var a = 0; a < 67; a++){
    if(a < 8){
      type[a] = 1; //spin
    }
    else if(a <= 15 && a > 7){
      type[a] = 2; //flip
    }
    else if(a <= 38 && a > 15 ){
      type[a] = 3; //angled brown arrow
    }
    else if(a <= 41 && a > 38 ){
      type[a] = 4; //angled tan arrow
    }
    else if(a <= 54 && a > 41 ){
      type[a] = 5; //orthogonal brown arrow
    }
    else{
      type[a] = 6; //orthogonal tan arrow
    }
  }
  type.sort(function(a, b){return 0.5 - Math.random()});
  //randomizes the board than i add home on one side, flip the array, and add home on that side
  type.push(0);
  type.reverse();
  type.push(0);

  var typeValue = "";
  for(var y = 0; y < 10; y++){
    for(var x = 0; x < 7; x++ ){
      var tile = new Tile();
      var cell = document.getElementById("a" + x + y + "");
      tile.cell = "a" + x + y;

      if(y == 0 && x == 1){
        /*
        This is a patch.
        The formula " type[(y*7) + x] "
        produces an error at x = 1, y =0.
        */
        typeValue = type[2];
        tile.type = typeValue;
        tile.url = urlArray[typeValue];
      }
      else{
        typeValue = type[(y*7) + x];
        tile.type = typeValue;
        tile.url = urlArray[typeValue];
      }

      if(tile.direction == 1){
          cell.className = "ninety-degrees";
      }
      else if(tile.direction == 2){
          cell.className = "one-eighty-degrees";
      }
      else if(tile.direction == 3){
          cell.className = "two-seventy-degrees";
      }

      if(tile.type == 0 || tile.type == 1 || tile.type == 2){
          tile.isOption = true;
          tile.isArrow = false;
      }
      else{
        tile.isOption = false;
        tile.isArrow = true;
      }

      cell.style.backgroundImage = "url('" + tile.url + "')";
      cell.style.backgroundSize = "100% 100%";
      tiles[(y*7) + x] = tile;
    }
  }
  Board.tiles = tiles;
  console.log(Board);
  return Board;
}

function table(){
  var board = document.getElementById('board');
  var tbl = document.createElement('table');
  var tbdy = document.createElement('tbody');
  for(var y = 0; y < 10; y++){
      var tr = document.createElement('tr'); //Must create rows first
    for(var x = 0; x < 7; x++ ){
      var td = document.createElement('td');
        td.id = "a" + x + y;
        td.style.height = '5vh';
        td.style.width = '5vh';
        td.style.padding = '.1vh .1vh';
        //td.style.border = "solid black 1px";
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  board.appendChild(tbl)
}

//=============================================================================

function adjacency(newBoard){
      var board = newBoard;
      var adjacency = document.getElementById('adjacency');
      var tbl2 = document.createElement('table');
      tbl2.style.width = '100%';
      tbl2.style.padding = '.5vh .5vh';
      tbl2.style.margin = '2vh 2vw';
      tbl2.setAttribute('border', '1');
      var tbdy2 = document.createElement('tbody');

      var tr3 = document.createElement('tr3');
      tr3.innerHTML = "x to y";
      var cycleButton = document.createElement('button');
      cycleButton.id = "nextButton";
      cycleButton.innerHTML = "next";
      cycleButton.onclick = cycle(board);
      tbdy2.appendChild(tr3);
      tbdy2.appendChild(cycleButton);

      for (var i = 0; i < 70; i++) {
          var tr2 = document.createElement('tr2');
          for (var j = 0; j < 70; j++) {
                  var td = document.createElement('td');
                  td.id = "td2" + j + i;
                  //matrix(td.id);
                  td.style.height = '5px';
                  td.style.width = '5px';
                  td.style.padding = '1px 1px';
                  tr2.appendChild(td);
          }
          tbdy2.appendChild(tr2);
      }
      tbl2.appendChild(tbdy2);
      adjacency.appendChild(tbl2)
}

//This function is for continual shuffling
function recursive(){
    //get the board element
    let board = document.getElementById('board');
    //empty the board element
    board.innerHTML = "";
    //rerun the new board operation
    table();
    var newBoard = createTileObject();
}

//This funciton is for the first time the page loads
function onceLoad(){
    table();
    var newBoard = createTileObject();
}

//=============================================================================

/**
(function(){
  table();
  var newBoard = createTileObject();
  //adjacency(newBoard);
})();
**/

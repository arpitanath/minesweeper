const grid = document.querySelector(".grid");
let rows = 5;
col = 3;
let bombCount = (rows * col) / 2;
grid.style.height = `${rows * 50}px`;
grid.style.width = `${col * 50}px`;
let fragment = document.createDocumentFragment();

//data
let data = [];
let bombs = [];

//generate random bombs
for (let i = 0; i < bombCount; i++) {
  bombs.push([
    Math.floor(Math.random() * Math.floor(rows)),
    Math.floor(Math.random() * Math.floor(col))
  ]);
}

//create MineSweeper board
function createModel() {
  for (let i = 0; i < rows; i++) {
    data.push([]);
    for (let j = 0; j < col; j++) {
      //populating our model
      data[i].push({
        row: i,
        col: j,
        bomb: false
      });
    }
  }
  //adding bomb variable in data object
  bombs.map(item => {
    data[item[0]][item[1]].bomb = true;
  });

  //get adjacent bombs count for each cell and update model
  getNeighborsWithBomb(data);
}

function getNeighborsWithBomb(data) {
  // possible combination of rows and columns
  let dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  let dy = [-1, 0, 1, -1, 1, -1, 0, 1];

  // we are trying to find neighboring cells of item
  for (let i = 0; i < data.length; i++) {
    data[i].map(item => {
      item.neighbors = [];
      let itemRow = item.row;
      let itemCol = item.col;
      for (let j = 0; j < 8; j++) {
        if (
          isValid(itemRow + dx[j], itemCol + dy[j]) &&
          data[itemRow + dx[j]][itemCol + dy[j]].bomb
        ) {
          item.neighbors.push([itemRow + dx[j], itemCol + dy[j]]);
        }
      }
    });
  }
  console.log("data after finding neighbors", data);
}

// function to check whether row and column value are valid
function isValid(x, y) {
  if (x < 0 || x >= rows || y < 0 || y >= col) {
    return false;
  }
  return true;
}

function createUIFromModel(data) {
  data.map(item => {
    for (let j = 0; j < item.length; j++) {
      const square = document.createElement("div");
      square.setAttribute("row", item[j].row);
      square.setAttribute("col", item[j].col);
      square.addEventListener("click", cellClick);
      fragment.appendChild(square);
    }
  });
  grid.appendChild(fragment);
}

function cellClick(e) {
  let ID = e.target.id;
  let selectedRow = e.target.getAttribute("row");
  let selectedCol = e.target.getAttribute("col");
  console.log(selectedRow, selectedCol);
  if (data[selectedRow][selectedCol].bomb) {
    e.target.className = "bomb";
  } else {
    console.log("selectedItem", data[selectedRow][selectedCol]);
    let count = data[selectedRow][selectedCol].neighbors.length;
    e.target.innerHTML = count;
  }
}

console.log("data", data);
console.log("bombs", bombs);
createModel();
createUIFromModel(data);

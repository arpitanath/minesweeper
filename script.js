const grid = document.querySelector(".grid");
let rows = 10,
  col = 10;
let bombCount = 20;
grid.style.width = `${rows * 50}px`;
grid.style.height = `${col * 50}px`;
let fragment = document.createDocumentFragment();

//data
let data = [];
let bombs = [];

//generate bombs
for (let i = 0; i < bombCount; i++) {
  bombs.push([
    Math.floor(Math.random() * Math.floor(10)),
    Math.floor(Math.random() * Math.floor(10))
  ]);
}

//create MineSweeper board
function createModel() {
  for (let i = 0; i < rows; i++) {
    data.push([]);
    for (let j = 0; j < col; j++) {
      //populating our model
      data[i].push({
        id: rows * i + j,
        row: i,
        col: j,
        clicked: false,
        bomb: false,
        isAdjBombPresent: false
      });
    }
  }
  //adding bomb variable in data object
  bombs.map(item => {
    data[item[0]][item[1]].bomb = true;
  });

  //get adjacent bombs count for each cell and update model
  //updateAdjacentBombCountInModel(data);
}

function updateAdjacentBombCountInModel(data) {
  let dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  let dy = [-1, 0, 1, -1, 1, -1, 0, 1];
  let neighbors = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValid(data[i], data[i].col)) {
      }
    }
  }
}

function isValid(x, y) {
  if (x < 0++ || x >= rows || y < 0 || y >= col) {
    return false;
  }
  return true;
}

function createUIFromModel(data) {
  data.map(item => {
    for (let j = 0; j < item.length; j++) {
      const square = document.createElement("div");
      square.setAttribute("cell-data", JSON.stringify(item[j]));
      square.setAttribute("id", item[0].row * rows + j);
      square.addEventListener("click", cellClick);
      fragment.appendChild(square);
    }
    grid.appendChild(fragment);
  });
}

function cellClick(e) {
  let cellData = e.path[0].getAttribute("cell-data");
  if (JSON.parse(cellData).bomb == true) {
    console.log(e.target);
    e.target.className = "bomb";
  }
}

console.log("data", data);
console.log("bombs", bombs);
createModel();
createUIFromModel(data);

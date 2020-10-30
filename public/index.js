import Board from "./board.js";
import BFS from "./algorithms/bfs.js";
import DFS from "./algorithms/dfs.js";


document.getElementById("modalDispBtn").click();

function InitializeBoard(startNode = null, endNode = null) {
  const height = window.innerHeight - document.getElementById("nav").offsetHeight - document.getElementById("bullets").offsetHeight; 
  const board = new Board(window.innerWidth-10, height, 25, 25);
  board.Initialize();
  return board;
}


const board = InitializeBoard();
let algo = null;

window.setAlgo = function(algoNo) {
  console.log(algoNo);
  switch(algoNo) {
    case 1:
      algo = new BFS(board);
      break;
    case 2:
      algo = new DFS(board);
      break;
    default:
      algo = new BFS(board);
  }
}


function visualize() {
  if(algo === null)
    return;
  board.clearVisitedAndDistance();
  board.toggleBoardInteraction();
  algo.runAlgo();
}

document.getElementById("visualize").addEventListener("click", visualize);

document.getElementById("reset").addEventListener("click", () => {
  board.reInitialize();
});

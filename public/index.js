import Board from "./board.js";
import BFS from "./algorithms/bfs.js";
import DFS from "./algorithms/dfs.js";


document.getElementById("modalDispBtn").click();

function InitializeBoard(startNode = null, endNode = null) {
  const height = window.innerHeight - document.getElementById("nav").offsetHeight - document.getElementById("bullets").offsetHeight - document.getElementById("algoDesc").offsetHeight; 
  const board = new Board(window.innerWidth-10, height, 25, 25);
  board.Initialize();
  return board;
}


const board = InitializeBoard();
let algo = null;

window.setAlgo = function(algoNo) { 
  const desc = document.getElementById("algo-description");

  switch(algoNo) {
    case 1:
      algo = new BFS(board);
      desc.innerHTML = "Breadth-first Search(BFS) is a <b>non-weighted</b> algorithm. It <b>gurantees</b> the shortest path."
      break;
    case 2:
      algo = new DFS(board);
      desc.innerHTML = "Depth-first Search(DFS) is a <b>non-weighted</b> algorithm. It <b>does not gurantee</b> the shortest path."
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

document.getElementById("clear").addEventListener("click", () => {
  board.clearVisitedAndDistance();
})

document.getElementById("reset").addEventListener("click", () => {
  board.reInitialize();
});

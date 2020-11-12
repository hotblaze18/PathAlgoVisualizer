import Board from "./board.js";
import BFS from "./algorithms/bfs.js";
import DFS from "./algorithms/dfs.js";
import Dijkstras from "./algorithms/dijkstras.js";
import Swarm from "./algorithms/swarm.js";
import ASTAR from "./algorithms/astar.js";

document.getElementById("modalDispBtn").click();

document.getElementById("weightSwitch").addEventListener("click", (e) => {
  const isChecked = document.getElementById("weightSwitchInput").checked;
  const txt = document.getElementById("switchText");
  if(isChecked) {
    txt.innerHTML = "Weight"
  } else {
    txt.innerHTML = "Wall";
  }
})

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
    case 3:
      algo = new Dijkstras(board);
      desc.innerHTML = "Dikstra's algorithm is a <b>weighted</b> algorithm. It <b>gurantees</b> the shortest path."
      break;
    case 4:
      algo = new Swarm(board);
      desc.innerHTML = "Swarm Search algorithm is a <b>weighted</b> algorithm. It <b>does not gurantee</b> the shortest path."
      break;
    case 5:
      algo = new ASTAR(board);
      desc.innerHTML = "A* Search algorithm is a <b>weighted</b> algorithm. It <b>gurantees</b> the shortest path."
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
  board.algoDone = false;
  board.clearVisitedAndDistance();
})

document.getElementById("reset").addEventListener("click", () => {
  algo = null;
  const desc = document.getElementById("algo-description");
  desc.innerHTML = "";
  board.reInitialize();
});

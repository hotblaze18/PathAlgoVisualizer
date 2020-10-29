import Board from "./board.js";
import BFS from "./bfs.js";

function InitializeBoard(startNode = null, endNode = null) {
  const board = new Board(window.innerWidth - 10, 485, 25, 25);
  board.Initialize();
  return board;
}

const board = InitializeBoard();

function visualize() {
  board.clearVisitedAndDistance();
  const bfs = new BFS(board);
  board.toggleBoardInteraction();
  bfs.runBFS();
}

document.getElementById("visualize").addEventListener("click", visualize);

document.getElementById("reset").addEventListener("click", () => {
  board.reInitialize();
});

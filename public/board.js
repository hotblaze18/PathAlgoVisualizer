import Node from "./node.js";

export default class Board {
  constructor(
    width,
    height,
    nodeWidth,
    nodeHeight,
    startNode = null,
    endNode = null
  ) {
    this.nodeWidth = nodeWidth;
    this.nodeHeight = nodeHeight;
    this.nodesX = Math.floor(width / nodeWidth);
    this.nodesY = Math.floor(height / nodeHeight);
    this.nodes = {}; //Entire list of nodes
    this.nodesMatrix = []; //storing as matrix also to iterate over neigbours easily
    this.width = this.nodesX * nodeWidth;
    this.height = this.nodesY * nodeHeight;
    this.startNode = startNode;
    this.destNode = endNode;
    this.mouseHold = false; // holding mouse to drag the walls to block multiple nodes
    this.dragSelected = null; //draging the start or end node into another cell
    this.currAlgo = null; // current algo that has been selected
    this.algoDone = false;  // has the current algo finished?
  }

  Initialize = () => {
    this.createBoard();
    this.addEventListeners();
  };

  reInitialize = () => {
    this.nodes = {};
    this.nodesMatrix = [];
    this.createBoard();
    this.addEventListeners();
  };

  toggleBoardInteraction = () => {
    const boardDOM = document.getElementById("board");
    if (boardDOM.getAttribute("class") == "disabled") {
      boardDOM.setAttribute("class", "");
    } else boardDOM.setAttribute("class", "disabled");
  };

  clearVisitedAndDistance = () => {
    for (let i = 0; i < this.nodesY; i++) {
      const row = this.nodesMatrix[i];
      row.map((node) => {
        node.dist = Infinity;
        node.prev = null;
        if (node.status !== "blocked" && node.weight === 1) {
          document
            .getElementById(node.id)
            .setAttribute("class", "node unvisited");
        } else if(node.weight > 1) {
          document
            .getElementById(node.id)
            .setAttribute("class", "node weight unvisited");
        }
        if (node.status == "visited") {
          node.status = "unvisited";
        }
      });
    }
  };

  createBoard = () => {
    const board = this;
    let count = 0;
    let boardHtml = `<table>`;
    for (let row = 0; row < board.nodesY; row++) {
      boardHtml += "<tr>";
      const currRow = [];
      for (let col = 0; col < board.nodesX; col++) {
        count++;
        let nodeId = count,
          nodeStatus = "unvisited";
        if (
          row === Math.floor(board.nodesY / 2) &&
          col === Math.floor(board.nodesX / 4)
        ) {
          boardHtml += `<td id=${nodeId} class='node'><i id='start' class="fa fa-arrows" aria-hidden="true"></i></td>`;
          nodeStatus = "start";
          const node = new Node(nodeId, nodeStatus, row, col);
          board.startNode = node;
          board.nodes[nodeId] = node;
          currRow.push(node);
        } else if (
          row === Math.floor(board.nodesY / 2) &&
          col === Math.floor(board.nodesX / 2)
        ) {
          boardHtml += `<td id=${nodeId} class='node'><i id='end' class="fa fa-times" aria-hidden="true"></i></td>`;
          nodeStatus = "end";
          const node = new Node(nodeId, nodeStatus, row, col);
          board.endNode = node;
          board.nodes[nodeId] = node;
          currRow.push(node);
        } else {
          boardHtml += `<td id=${nodeId} class='node'></td>`;
          const node = new Node(nodeId, nodeStatus, row, col);
          this.nodes[nodeId] = node;
          currRow.push(node);
        }
      }
      board.nodesMatrix.push(currRow);
      boardHtml += "</tr>";
    }
    boardHtml += "</table>";

    const boardElement = document.getElementById("board");
    boardElement.innerHTML = boardHtml;

    const nodes = document.querySelectorAll(".node");

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].style.width = `${board.nodeWidth}px`;
      nodes[i].style.height = `${board.nodeHeight}px`;
    }
  };

  addEventListeners = () => {
    const board = this;
    const boardElement = document.getElementById("board");
    const nodes = document.querySelectorAll(".node");

    let startIcon = document.getElementById("start");
    let endIcon = document.getElementById("end");

    //dragging the start node to other cells
    startIcon.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      board.dragSelected = e.target.parentNode;
    });

    endIcon.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      board.dragSelected = e.target.parentNode;
    });

    for (let i = 0; i < nodes.length; i++) {
      // mouse over can either block or unblock a node based on mouseHold
      // Also it can drag start or end node based on dragSelected
      nodes[i].addEventListener("mouseenter", (e) => {
        const node = e.target;
        const id = node.getAttribute("id");

        // handle the draging of start and end nodes
        if (board.dragSelected !== null) {
          const prevNode = board.dragSelected;
          const newNode = nodes[i];
          const prevId = prevNode.getAttribute("id");
          const newId = newNode.getAttribute("id");
          const status = board.nodes[prevId].status;
          if (prevId !== newId) {
            board.nodes[newId].status = status;
            board.nodes[prevId].status = "unvisited";
            newNode.innerHTML = prevNode.innerHTML;
            prevNode.innerHTML = "";

            if (status === "start") {
              board.startNode = board.nodes[newId];
              startIcon = document.getElementById("start");
              startIcon.addEventListener("mousedown", (e) => {
                e.stopPropagation();
                board.dragSelected = e.target.parentNode;
              });
            } else if (status === "end") {
              board.endNode = board.nodes[newId];
              endIcon = document.getElementById("end");
              endIcon.addEventListener("mousedown", (e) => {
                e.stopPropagation();
                board.dragSelected = e.target.parentNode;
              });
            }
            board.dragSelected = newNode;
            if (board.algoDone === true) {
              board.clearVisitedAndDistance();
              board.currAlgo.runFast();
            }
          }
        }

        //handle the appearance and disapperance of walls and weights when user is holding mouse.
        if (board.mouseHold === true && board.nodes[id].canChangeState === true) {
          board.nodes[id].canChangeState = false;
          const isChecked = document.getElementById("weightSwitchInput").checked;
          setTimeout(() => {
            board.nodes[id].canChangeState = true; //for smooth apperance and dissaperance.
          }, 500);
          if (
            board.nodes[id].status === "unvisited" ||
            board.nodes[id].status === "visited"
          ) {
            if(!isChecked) {
              board.nodes[id].status = "blocked";
              node.setAttribute("class", "node wall");
            } else {
              board.nodes[id].status = "weighted";
              board.nodes[id].weight = 15;
              node.setAttribute("class", "node weight");
            }
          } else if (board.nodes[id].status === "blocked" || board.nodes[id].status === "weighted") {
            board.nodes[id].status = "unvisited";
            board.nodes[id].weight = 1;
            node.setAttribute("class", "node unvisited");
          }
        }
      });

      
      nodes[i].addEventListener("mousedown", (e) => {
        const node = e.target;
        const id = node.getAttribute("id");
        const isChecked = document.getElementById("weightSwitchInput").checked;
        if (
          board.nodes[id].status === "unvisited" ||
          board.nodes[id].status === "visited"
        ) {
          if(!isChecked) {
            board.nodes[id].status = "blocked";
            node.setAttribute("class", "node wall");
          } else {
            board.nodes[id].status = "weighted";
            board.nodes[id].weight = 15;
            node.setAttribute("class", "node weight");
          }
          board.mouseHold = true;
        } else if (board.nodes[id].status === "blocked" || board.nodes[id].status === "weighted") {
          board.nodes[id].status = "unvisited";
          board.nodes[id].weight = 1;
          node.setAttribute("class", "node unvisited");
          board.mouseHold = true;
        }
      });

      nodes[i].addEventListener("mouseup", (e) => {
        board.mouseHold = false;
        board.dragSelected = null;
      });
    }
  };
}

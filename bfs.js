export default class BFS {
  constructor(board) {
    this.board = board;
    this.rows = board.nodesY;
    this.cols = board.nodesX;
    this.nodes = board.nodesMatrix;
    this.startNode = board.startNode;
    this.endNode = board.endNode;
    this.shortestPath = [];
    this.queue = [];
  }

  clearData = () => {
    this.shortestPath = [];
    this.queue = [];
  };

  isValid = (row, col) => {
    return (
      row >= 0 &&
      row < this.rows &&
      col >= 0 &&
      col < this.cols &&
      this.nodes[row][col].status !== "blocked"
    );
  };

  runBFS = () => {
    this.board.currAlgo = this;
    const rowM = [-1, 0, 1, 0];
    const colM = [0, 1, 0, -1];
    let flag = false;

    this.startNode.dist = 0;
    this.queue.push(this.startNode);
    let time = 500;
    while (this.queue.length > 0) {
      const currNode = this.queue.shift();
      const i = currNode.row;
      const j = currNode.col;

      for (let k = 0; k < 8; k++) {
        let row = i + rowM[k];
        let col = j + colM[k];

        if (this.isValid(row, col) === true) {
          if (this.nodes[row][col].dist > currNode.dist + 1) {
            this.nodes[row][col].dist = currNode.dist + 1;
            this.nodes[row][col].prev = currNode;
          }

          if (this.nodes[row][col].status === "end") {
            flag = true;
            break;
          } else if (this.nodes[row][col].status == "start") {
          } else if (this.nodes[row][col].status !== "visited") {
            this.queue.push(this.nodes[row][col]);
            this.nodes[row][col].status = "visited";
            const DOMRef = document.getElementById(this.nodes[row][col].id);
            setTimeout(() => {
              DOMRef.setAttribute("class", "node visited");
            }, time);
            time += 20;
          }
        }
      }

      if (flag === true) {
        let currNode = this.endNode;
        while (currNode !== null) {
          this.shortestPath.unshift(currNode);
          currNode = currNode.prev;
        }
        this.shortestPath.map((node) => {
          const DOMRef = document.getElementById(node.id);
          setTimeout(() => {
            DOMRef.setAttribute("class", "node path");
          }, time);
          time += 20;
        });
        setTimeout(() => {
          this.board.toggleBoardInteraction();
        }, time);
        this.board.algoDone = true;
        break;
      }
    }
  };

  runFast = () => {
    this.clearData();
    const rowM = [-1, 0, 1, 0];
    const colM = [0, 1, 0, -1];
    let flag = false;

    this.board.startNode.dist = 0;
    this.queue.push(this.board.startNode);
    while (this.queue.length > 0) {
      const currNode = this.queue.shift();
      const i = currNode.row;
      const j = currNode.col;

      for (let k = 0; k < 8; k++) {
        let row = i + rowM[k];
        let col = j + colM[k];

        if (this.isValid(row, col) === true) {
          if (this.nodes[row][col].dist > currNode.dist + 1) {
            this.nodes[row][col].dist = currNode.dist + 1;
            this.nodes[row][col].prev = currNode;
          }

          if (this.nodes[row][col].status === "end") {
            flag = true;
            break;
          } else if (this.nodes[row][col].status == "start") {
          } else if (this.nodes[row][col].status !== "visited") {
            this.queue.push(this.nodes[row][col]);
            this.nodes[row][col].status = "visited";
            const DOMRef = document.getElementById(this.nodes[row][col].id);
            DOMRef.setAttribute("class", "node visited");
          }
        }
      }

      if (flag === true) {
        let currNode = this.board.endNode;
        while (currNode !== null) {
          this.shortestPath.unshift(currNode);
          currNode = currNode.prev;
        }
        console.log(this.shortestPath);
        this.shortestPath.map((node) => {
          const DOMRef = document.getElementById(node.id);
          DOMRef.setAttribute("class", "node path");
        });
        break;
      }
    }
  };
}

import BinaryHeap from "../ds/BinaryHeap.js";

export default class Djkstras {
    constructor(board) {
        this.board = board;
        this.rows = board.nodesY;
        this.cols = board.nodesX;
        this.nodes = board.nodesMatrix;
        this.shortestPath = [];
        this.values = [];
        this.heap = null;
    }

    clearData = () => {
      this.shortestPath = [];
      this.values = [];
      this.heap = null;
    };

    setHeap() {
        for(let i=0; i<this.rows; i++) {
            this.values = this.values.concat(this.nodes[i]);
        }

        const comp = (nodeA, nodeB) => {
            return nodeA.dist <= nodeB.dist;
        }

        this.heap = new BinaryHeap(this.values, comp);
    }

    isValid = (row, col) => {
        return (
          row >= 0 &&
          row < this.rows &&
          col >= 0 &&
          col < this.cols &&
          this.nodes[row][col].status !== "blocked" &&
          this.nodes[row][col].status !== "visited" &&
          this.nodes[row][col].status !== "start"
        );
      };
    
      runAlgo() {
        this.board.currAlgo = this;
  
        const rowM = [-1, 0, 1, 0];
        const colM = [0, 1, 0, -1];
        const startNode = this.board.startNode;
        startNode.dist = 0;
        this.setHeap();
        let flag = false;
        let time = 500;
  
        while(true) {
            this.heap.makeHeap();
            const minDistNode = this.heap.extractTop();
  
            const i = minDistNode.row;
            const j = minDistNode.col;
  
            for (let k = 0; k < 4; k++) {
                let row = i + rowM[k];
                let col = j + colM[k];
        
                if (this.isValid(row, col) === true) {
                  if (this.nodes[row][col].dist > minDistNode.dist + this.nodes[row][col].weight) {
                    this.nodes[row][col].dist = minDistNode.dist + this.nodes[row][col].weight;
                    this.nodes[row][col].prev = minDistNode;
                  }
  
                  if(this.nodes[row][col].status === "end") {
                    flag = true;
                    break;
                  } else {
                    this.nodes[row][col].status = "visited";
                    const DOMRef = document.getElementById(this.nodes[row][col].id);
                    setTimeout(() => {
                      DOMRef.classList.add("visited");
                    }, time);
                    time += 20;
                  }
  
                }
            }
  
            if(flag === true)
                break;
        }
  
        let currNode = this.board.endNode;
        while (currNode !== null) {
          this.shortestPath.unshift(currNode);
          currNode = currNode.prev;
        }
        this.shortestPath.map((node) => {
          const DOMRef = document.getElementById(node.id);
          setTimeout(() => {
            DOMRef.classList.remove("visited");
            DOMRef.classList.add("path");
          }, time);
          time += 20;
        });
        setTimeout(() => {
          this.board.toggleBoardInteraction();
        }, time);
        this.board.algoDone = true;
    }  

    runFast() {
        this.clearData();
        const rowM = [-1, 0, 1, 0];
        const colM = [0, 1, 0, -1];
        const startNode = this.board.startNode;
        startNode.dist = 0;
        this.setHeap();
        let flag = false;

        while(true) {
            this.heap.makeHeap();
            const minDistNode = this.heap.extractTop();

            const i = minDistNode.row;
            const j = minDistNode.col;

            for (let k = 0; k < 4; k++) {
                let row = i + rowM[k];
                let col = j + colM[k];
        
                if (this.isValid(row, col) === true) {
                  if (this.nodes[row][col].dist > minDistNode.dist + this.nodes[row][col].weight) {
                    this.nodes[row][col].dist = minDistNode.dist + this.nodes[row][col].weight;
                    this.nodes[row][col].prev = minDistNode;
                  }

                  if(this.nodes[row][col].status === "end") {
                    flag = true;
                    break;
                  } else {
                    this.nodes[row][col].status = "visited";
                    const DOMRef = document.getElementById(this.nodes[row][col].id);
                    DOMRef.classList.add("visited");
                  }
                }
            }

            if(flag === true)
                break;
        }

        let currNode = this.board.endNode;
        while (currNode !== null) {
          this.shortestPath.unshift(currNode);
          currNode = currNode.prev;
        }
        this.shortestPath.map((node) => {
          const DOMRef = document.getElementById(node.id);
          DOMRef.classList.remove("visited");
          DOMRef.classList.add("path");
        });
    }
}
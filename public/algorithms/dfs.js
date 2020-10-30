export default class DFS {
    constructor(board) {
      this.board = board;
      this.rows = board.nodesY;
      this.cols = board.nodesX;
      this.nodes = board.nodesMatrix;
      this.startNode = board.startNode;
      this.endNode = board.endNode;
      this.stack = [];
      this.path = [];
    }
  
    clearData = () => {
      this.stack = [];
      this.path = [];
    };
  
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
  
    runAlgo = () => {
      this.board.currAlgo = this;
      const rowM = [-1, 0, 1, 0];
      const colM = [0, 1, 0, -1];
      this.startNode.dist = 0;
      let time = 500;

      this.stack.push(this.startNode);

      while(this.stack.length !== 0) {
          const currNode = this.stack.pop();
          
          if(currNode.status === "end") {
            let currNode = this.endNode;
            while (currNode !== null) {
              this.path.unshift(currNode);
              currNode = currNode.prev;
            }
            console.log(this.path);
            this.path.map((node) => {
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

          const i = currNode.row;
          const j = currNode.col;  
        
          if(currNode.status !== "start") {
            this.nodes[i][j].status = "visited";
            const DOMRef = document.getElementById(this.nodes[i][j].id);
            setTimeout(() => {
                DOMRef.setAttribute("class", "node visited");
            }, time);
            time+=20;
          }
    
          for (let k = 0; k < 4; k++) {
            let row = i + rowM[k];
            let col = j + colM[k];
    
          if (this.isValid(row, col) === true) {
            if (this.nodes[row][col].dist > currNode.dist + 1) {
              this.nodes[row][col].dist = currNode.dist + 1;
              this.nodes[row][col].prev = currNode;
            }
            this.stack.push(this.nodes[row][col]);
          }
        }
      }
  }

  runFast = () => {
    const rowM = [-1, 0, 1, 0];
    const colM = [0, 1, 0, -1];
    this.clearData();
    this.board.startNode.dist = 0;
    this.stack.push(this.board.startNode);

    while(this.stack.length !== 0) {
        const currNode = this.stack.pop();
        
        if(currNode.status === "end") {
          let currNode = this.board.endNode;
          while (currNode !== null) {
            this.path.unshift(currNode);
            currNode = currNode.prev;
          }
          console.log(this.path);
          this.path.map((node) => {
            const DOMRef = document.getElementById(node.id);
            DOMRef.setAttribute("class", "node path");
          });
          break;
        }  

        const i = currNode.row;
        const j = currNode.col;  
      
        if(currNode.status !== "start") {
          this.nodes[i][j].status = "visited";
          const DOMRef = document.getElementById(this.nodes[i][j].id);
          DOMRef.setAttribute("class", "node visited");
        }
  
        for (let k = 0; k < 4; k++) {
          let row = i + rowM[k];
          let col = j + colM[k];
  
        if (this.isValid(row, col) === true) {
          if (this.nodes[row][col].dist > currNode.dist + 1) {
            this.nodes[row][col].dist = currNode.dist + 1;
            this.nodes[row][col].prev = currNode;
          }
          this.stack.push(this.nodes[row][col]);
        }
      }
    }
}

}
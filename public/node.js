export default class Node {
  constructor(id, status, row, col, dist = Infinity, weight=1) {
    this.id = id;
    this.status = status;
    this.dist = dist;
    this.prev = null;
    this.row = row;
    this.col = col;
    this.canChangeState = true;
    this.weight = weight;
  }
}

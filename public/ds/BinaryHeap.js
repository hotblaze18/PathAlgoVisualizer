export default class BinaryHeap {
    constructor(values, comparisionFn) {
        this.values = values;
        this.comparisionFn = comparisionFn;
    }

    shiftDown(index) {
        const length = this.values.length;
        const current = this.values[index];
        
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
      
            if (leftChildIndex < length) {
              leftChild = this.values[leftChildIndex];
              if (this.comparisionFn(leftChild, current)) swap = leftChildIndex;
            }
            if (rightChildIndex < length) {
              rightChild = this.values[rightChildIndex];
              if (
                (swap === null && this.comparisionFn(rightChild, current)) ||
                (swap !== null && this.comparisionFn(rightChild, leftChild))
              )
                swap = rightChildIndex;
            }
      
            if (swap === null) break;
            this.values[index] = this.values[swap];
            this.values[swap] = current;
            index = swap;
          }
    }

    extractTop() {
        const top = this.values[0];
        const end = this.values.pop();
        this.values[0] = end;

        this.shiftDown(0);

        return top;
    }

    makeHeap() {
        const n = this.values.length;
        for(let i=Math.floor((n-1)/2); i>=0; i--) {
            this.shiftDown(i);
        }
    }
}


/**
 *  
 */
 export default class Stack {
  s = [];

  add(e) {
    this.s.push(e);
  }
  pop() {
    return this.s.pop();
  }
  clear() {
    this.s.length = 0;
  };
  size() {
    return this.s.length;
  };
  toArray() {
    return this.s;
  }
}
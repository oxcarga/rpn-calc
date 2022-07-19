export default class Operation {
  #operations = {
    "*": (a,b) => a*b,
    "/": (a,b) => a/b,
    "+": (a,b) => a+b,
    "-": (a,b) => a-b,
  };

  #err = {
    NO_OP: "[ERROR] No operands!",
    NO_BY_ZERO: "[ERROR] Can't divide by zero!",
  };

  constructor(stack, inpArr) {
    this.stack = stack;
    this.inpArr = inpArr;
  }

  process() {
    let res;
    for (const inp of this.inpArr) {
      res = this.#checkOperand(inp);
      res = this.#checkOperation(inp);
      if (res) {
        break;
      }
    }
    return res;
  }

  #checkOperand(inp) {
    if (typeof parseFloat(inp) === "number" && !isNaN(parseFloat(inp))) {
      this.stack.add(parseFloat(inp));
    }
  }

  #checkOperation(inp) {
    const _inp = inp.trim().split("\n")[0];
    const fn = this.#operations[_inp];
    if (!fn) { return; }
    const stackSize = this.stack.size();
    // no operands
    if (stackSize <= 1) {
      return this.#err.NO_OP;
    }
    const a = this.stack.pop();
    const b = this.stack.pop();
    // no divisible by 0
    if (b === 0 && _inp === "/") {
      return this.#err.NO_BY_ZERO;
    }
    // do the math
    this.stack.add(fn(a,b));
  }
}
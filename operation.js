export default class Operation {
  //
  #operations = {
    "*": (a,b) => a*b,
    "/": (a,b) => a/b,
    "+": (a,b) => a+b,
    "-": (a,b) => a-b,
  };

  //
  #commands = {
    "q": () => process.exit()
  };

  //
  #err = {
    NO_OP: "[ERROR] No operands!",
    NO_BY_ZERO: "[ERROR] Can't divide by zero!",
  };

  /**
   *  
   */
  constructor(stack, inpArr) {
    this.stack = stack;
    this.inpArr = inpArr;
  }

  /**
   *  
   */
  process() {
    let res;
    for (let inp of this.inpArr) {
      inp = inp.trim().split("\n")[0];
      this.#checkCommand(inp);
      res = this.#checkOperand(inp);
      res = this.#checkOperation(inp);
      if (res) {
        break;
      }
    }
    return res;
  }

  /**
   *  
   */
  #checkCommand(inp) {
    const cmd = this.#commands[inp];
    return cmd && cmd();
  }

  /**
   *  
   */
  #checkOperand(inp) {
    if (typeof parseFloat(inp) === "number" && !isNaN(parseFloat(inp))) {
      this.stack.add(parseFloat(inp));
    }
  }

  /**
   *  
   */
  #checkOperation(inp) {
    const fn = this.#operations[inp];
    if (!fn) { return; }
    const stackSize = this.stack.size();
    // no operands
    if (stackSize <= 1) {
      return this.#err.NO_OP;
    }
    const a = this.stack.pop();
    const b = this.stack.pop();
    // no divisible by 0
    if (b === 0 && inp === "/") {
      return this.#err.NO_BY_ZERO;
    }
    // do the math
    this.stack.add(fn(a,b));
  }
}

import Stack from './stack.js';
import Operation from './operation.js';


/**
 *  
 */
const main = (inp) => {
  const input = inp.toString();
  const inpArr = input.split(" ");
  const op = new Operation(stack, inpArr);
  const res = op.process();
  if (typeof res === "string") {
    console.error(res);
  }
  console.log(stack.toArray());
};

const stack = new Stack();
process.stdin.resume();
process.stdin.on("data", main);
process.on('SIGTERM', () => {
  console.log('Terminating process');
});

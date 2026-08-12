// console.log(process.argv);
import { retriveResult } from "./parse";
import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";

require("dotenv").config();


export  const rl = readline.createInterface({ input, output });
export function main() {
  rl.question("enter input: ", handleCommand);
}

export function handleCommand(command: string): string | void {
  command = command.trim().toLowerCase();
  if (command === "exit") {
    return rl.close();
  }
  console.log(retriveResult(command));
  main();
}


if (require.main === module || (process.argv[1] && process.argv[1].includes('index'))) {
  main();
}

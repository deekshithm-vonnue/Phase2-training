"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpFunction = void 0;
exports.retriveResult = retriveResult;
const os = require("os");
const helpFunction = () => {
    const helpCommand = `--help \n
  --node-version\t display current version of node installed\n
  --os-inform\t display all information regrading os in use`;
    return helpCommand;
};
exports.helpFunction = helpFunction;
function retriveResult(args) {
    switch (args) {
        case "--node-version":
            return process.version;
        case "--os-inform":
            return `Platform: ${os.platform()}`;
        case "pwd":
            return `current directory: ${process.cwd()}`;
        case "--env":
            return `API_KEY: ${process.env.API_KEY}`;
        case "--totalmemory":
            return `Total Memory: ${os.totalmem()}`;
        case "--help":
            return (0, exports.helpFunction)();
        default:
            return `wrong command use --help for using man`;
    }
}
//# sourceMappingURL=parse.js.map
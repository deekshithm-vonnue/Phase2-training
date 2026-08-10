const os = require("os");

export const helpFunction = (): string => {
  const helpCommand = `--help \n
  --node-version\t display current version of node installed\n
  --os-inform\t display all information regrading os in use`;
  return helpCommand;
};
export function retriveResult(args: string): string {
  switch (args) {
    case "--node-version":
      return process.version;
    case "--os-inform":
      return `Platform: ${os.platform()}`;
    case "pwd":
      return `current directory: ${process.cwd()}`;
    case "--env":
        return `API_KEY: ${process.env.API_KEY}`
    case "--totalmemory":
        return `Total Memory: ${os.totalmem()}`
    case "--help":
      return helpFunction();
    default:
      return `wrong command use --help for using man`;
  }
}
import { handleCommand } from "./index";
import * as readline from "node:readline"

jest.mock("node:readline", () => {
  const mockQuestion = jest.fn();
  const mockClose = jest.fn();
  
  return {
    createInterface: jest.fn().mockReturnValue({
      question: mockQuestion,
      close: mockClose,
    }),
  };
});

jest.mock("./parse", () => ({
  retriveResult: jest.fn().mockReturnValue("mocked string output"),
}));

describe("reading the input from command line", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should handle command correctly", () => {
    expect(() => handleCommand("hello")).not.toThrow();
  });

    test("should call rl.close() when command is 'exit'", () => {
            const mockedReadline = readline.createInterface({ 
      input: process.stdin, 
      output: process.stdout 
    });

      handleCommand("exit");
      expect(mockedReadline.close).toHaveBeenCalledTimes(1);
    })
});

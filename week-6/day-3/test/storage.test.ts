import { readTasks, saveTasks } from "../js/storage.ts";
import fs from "node:fs/promises";

jest.mock("node:fs/promises");

describe("readTasks validation", () => {
  let readFileSpy: jest.SpyInstance;
  beforeEach(() => {
    readFileSpy = jest.spyOn(fs, "readFile");
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return data when readTasks is called", async () => {
    const mockJSONData = JSON.stringify([
      { id: 1, title: "create login page", completed: false },
    ]);
    readFileSpy.mockResolvedValue(mockJSONData);
    const result = await readTasks();
    expect(readFileSpy).toHaveBeenCalled();

    expect(result).toBeInstanceOf(Array);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          completed: expect.any(Boolean),
        }),
      ]),
    );
  });

  test("should return empty array when file is not found", async () => {
    readFileSpy.mockRejectedValue(new Error("File not found"));
    const result = await readTasks();
    expect(readFileSpy).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});

describe("saveTask validation", () => {
  let writeFileSpy: jest.SpyInstance;
  beforeEach(() => {
    writeFileSpy = jest.spyOn(fs, "writeFile");
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should save tasks", async () => {
    const task = [{ id: 1, title: "create login page", completed: false }];
    await saveTasks(task);
    expect(writeFileSpy).toHaveBeenCalled();
  });
});

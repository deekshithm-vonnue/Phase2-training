import { json } from "body-parser";
import { readFile, writeFile } from "node:fs/promises";
import type { Ticket } from "./types/type.ts";

const FILEPATH = "./ticket.json";
import { AppError } from "./types/appError.ts";
export async function readTickets(): Promise<Ticket[]> {
  try {
    const data = await readFile(FILEPATH, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    return [];
  }
}

export async function saveTicket(tickets: Ticket[]) {
  try {
    const datastring = JSON.stringify(tickets, null, 2);
    await writeFile(FILEPATH, datastring, "utf-8");
  } catch (error) {
    throw new Error("Failed to save");
  }
}

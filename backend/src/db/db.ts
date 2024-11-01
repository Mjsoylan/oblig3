



import Database from "better-sqlite3";
import { makeLogger } from "lib/logger.js";



export const db = new Database("dev.db", {
  verbose: (message: unknown) => makeLogger().info(`${message}`),
});

export type DB = typeof db;

export default db;


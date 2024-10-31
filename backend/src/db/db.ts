



import Database from "better-sqlite3";
import { makeLogger } from "lib/logger.js";
import { env } from "process";



export const db = new Database(env.DATABASE_URL, {
  verbose: (message: unknown) => makeLogger().info(`${message}`),
});

export type DB = typeof db;

export default db;


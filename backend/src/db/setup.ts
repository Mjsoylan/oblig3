import type { DB } from "./db.js";
import { seed } from "./seed.js";
import { createTables } from "./tables.js";


export const setup = async (db: DB) => {
  await createTables(db);
  await seed(db);
};
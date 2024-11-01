import type { DB } from "./db.js";
import { seed } from "./seed.js";
import { createTables } from "./tables.js";


export const setup = async (db: DB) => {
  await createTables(db);
  console.log("tabel done")
  await seed(db);
  console.log("seed done")
};
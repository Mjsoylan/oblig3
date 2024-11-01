import type { DB } from "./db.js";


export const createTables = async (db: DB) => {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    tittle TEXT NOT NULL,
    user_id TEXT NOT NULL,
    tag TEXT NOT NULL,
    published_at TEXT,
    public TEXT NOT NULL,
    status TEXT NOT NULL,
    textinfo TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

`);

  db.exec(`
  CREATE INDEX IF NOT EXISTS idx_projects_userId ON projects(user_id);
`);
};
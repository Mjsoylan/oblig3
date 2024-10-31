// ... imports av typer, fs og join

import { join } from "path";
import type { DB } from "./db.js";
type User ={
    id:string;
    name: string;
};
type Project ={
    id:number;
    tittle: string;
    user_id: string;
    tag:string;
    published_at:string;
    public:string;
    status:string;
    textinfo:string;
};



export const seed = async (db: DB) => {
    const path = join(import.meta.dirname, "data.json");
    var fs = require('fs');
    const file = await fs.readFile(path, "utf-8");
    const { users, projects } = JSON.parse(file) as {
      users: User[];
      projects: Project[];
    };
  
    const insertUser = db.prepare(`
      INSERT INTO users (id, name) VALUES (?,?)
    `);
  
    // ... (lignende prepare-statements for habits og streaks)
    const insertProjects = db.prepare(`
        INSERT INTO users (id, tittle,user_id,tag,published_at,public,status,textinfo) VALUES (?,?,?,?,?,?,?,?)
      `);
  
    db.transaction(() => {
      for (const user of users) {
        insertUser.run(user.id, user.name);
      }
  
      for (const Project of projects) {
        insertProjects.run(Project.id, Project.tittle ,Project.user_id,Project.tag,Project.published_at,Project.public,Project.status,Project.textinfo);
      }
    })();
  };
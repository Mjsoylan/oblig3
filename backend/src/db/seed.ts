// ... imports av typer, fs og join
import fs from "node:fs/promises";
import { join } from "path";
import type { DB } from "./db.js";
import type { User } from "@/features/types/users.js";
import type { project } from "@/features/types/project.js";




export const seed = async (db: DB) => {
    const path = join(import.meta.dirname, "data.json");;
    const file = await fs.readFile(path, "utf-8");
    const { users, projects } = JSON.parse(file) as {
      users: User[];
      projects: project[];
    };
    console.log(users)
  
    const insertUser = db.prepare(`
      INSERT INTO users (id, name) VALUES (?,?)
    `);
  
   
    const insertProjects = db.prepare(`
        INSERT INTO Projects (id,tittle,user_id,tag,published_at,public,status,textinfo) 
        VALUES                (?,     ?,       ?, ?,           ?,       ?     ,?  ,?)
      `);
  
      db.transaction(() => {
        insertUser.run(users[0].id, users[0].name);
        insertUser.run(users[1].id, users[1].name);
        let i :number =0;
        insertProjects.run(projects[i].id, projects[i].tittle ,projects[i].user_id,projects[i].tag,projects[i].published_at,projects[i].public,projects[i].status,projects[i].textinfo);
        i++;
        insertProjects.run(projects[i].id, projects[i].tittle ,projects[i].user_id,projects[i].tag,projects[i].published_at,projects[i].public,projects[i].status,projects[i].textinfo);
        i++;
        insertProjects.run(projects[i].id, projects[i].tittle ,projects[i].user_id,projects[i].tag,projects[i].published_at,projects[i].public,projects[i].status,projects[i].textinfo);
        i++;
        insertProjects.run(projects[i].id, projects[i].tittle ,projects[i].user_id,projects[i].tag,projects[i].published_at,projects[i].public,projects[i].status,projects[i].textinfo);
        i++;
        insertProjects.run(projects[i].id, projects[i].tittle ,projects[i].user_id,projects[i].tag,projects[i].published_at,projects[i].public,projects[i].status,projects[i].textinfo);
        
        /*
        for(const user of users) {
          
        }
        
        
        
      for (const project of projects) {
        insertProjects.run(project.id, project.tittle ,project.user_id,project.tag,project.published_at,project.public,project.status,project.textinfo);
      }

      */
    })();
  };
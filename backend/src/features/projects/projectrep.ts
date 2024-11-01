import type { number } from "zod";
import type { DB } from "../../db/db.js";
import type { promises } from "dns";
import type { project } from "../types/project.js";
import type { Result } from "lib/result.js";
import { ResultHandler } from "lib/failures.js";
import { fromDb, toDb } from "../mappers/projectmapper.js";


export const createProjectrepository = (db : DB) => {

    const exist =async (id:string): Promise<boolean> => {
        const query =db.prepare(
            "SELECT COUNT(*) AS  count FROM projects WHERE id = ?"
        );
        const data =query.get(id) as {count: number};
        return data.count >0;
    }

    const getById = async (
        id: string,
        userId:string 
    ): Promise<Result<project | undefined>> =>{

        try {
            const project = await exist(id);
            if (!project)  return ResultHandler.failure("project not found", "NOT_FOUND");
            const query =db.prepare(
            "SELECT * FROM projects WHERE id = ? AND user_id = ?"
            );
            const data = query.get(id,userId) as project;
            return ResultHandler.success(fromDb(data));
            } catch (error) {
            return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
            }
    }

    const listByUser = async (userId: string, query: Record<string, string>): Promise<Result<project[]>> => {
        try {
          const query = db.prepare("SELECT * FROM projects WHERE user_id = ?");
          const data = query.all(userId) as project[];
          // Mapper alle vaner fra databaseformat til applikasjonsformat
          return ResultHandler.success(data.map((project) => fromDb(project)));
        } catch (error) {
          return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
        }
      };

    const list = async (): Promise<Result<project[]>> => {
        try {
          const query = db.prepare("SELECT * FROM projects");
          const data = query.all() as project[];
          // Mapper alle vaner fra databaseformat til applikasjonsformat
          return ResultHandler.success(data.map((project) => fromDb(project)));
        } catch (error) {
          return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
        }
      };

      const create = async (data: project): Promise<Result<string>> => {
        try {
            // Konverterer fra applikasjonsformat til databaseformat
          const project = toDb(data);
    
          const query = db.prepare(`
             INSERT INTO Projects (id, tittle,user_id,tag,published_at,public,status,textinfo) 
             VALUES (?,?,?,?,?,?,?,?)
          `);
    
          query.run(
            project.id,
            project.tittle,
            project.user_id,
            project.tag,
            project.published_at,
            project.public,
            project.status,
            project.textinfo
          );
          return ResultHandler.success(project.id);
        } catch (error) {
          return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
        }
      };

      const update = async (data: project, id: string): Promise<Result<Partial<project>>> => {
        try {
          const projectExist = await exist(id);
    
          if (!projectExist)
            return ResultHandler.failure("project was not found", "NOT_FOUND");
          const project = toDb(data);
          const query = db.prepare(`
            UPDATE projects
            SET tittle = ?, user_id = ?, tag = ?, published_at = ?, public = ?, status = ?, textinfo = ?
            WHERE id = ?
          `);
    
          query.run(
            project.tittle,
            project.user_id,
            project.tag,
            project.published_at,
            project.public,
            project.status,
            project.textinfo
          );
          return ResultHandler.success(data);
        } catch (error) {
          return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
        }
      };

      const remove = async (
        id: string,
        userId: string
      ): Promise<Result<string>> => {
        try {
          const project = await exist(id);
          if (!project) return ResultHandler.failure("project was not found", "NOT_FOUND");
          const query = db.prepare(
            "DELETE FROM projects WHERE id = ? AND user_id = ?"
          );
          query.run(id, userId);
          // Returnerer ID-en til den slettede vanen
          return ResultHandler.success(id);
        } catch (error) {
          return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
        }
      };
    
        return {create,list,getById,update,listByUser,remove};
    }


   


export type Projectrepository = ReturnType<typeof createProjectrepository>
import db from "@/db/db.js";
import { createProjectrepository, type Projectrepository} from "../projects/projectrep.js"
import type { CreateprojectDto, project, UpdateprojectDto } from "../types/project.js";
import type { Result } from "lib/result.js";
import { ResultHandler } from "lib/failures.js";
import { createproject } from "../mappers/projectmapper.js";

export const createprojectService  = (Projectrepository: Projectrepository ) => {

    const getById = async (
        id: string,
        user_id: string
      ): Promise<Result<project | undefined>> => {
        return Projectrepository.getById(id, user_id);
      };

      const list = async (): Promise<Result<project[]>> => {
        return Projectrepository.list();
      };

      const listByUser = async (
        userId: string,
        query: Record<string, string>
      ): Promise<Result<project[]>> => {
        return Projectrepository.listByUser(userId,query);
      };
      
      const create = async (data: CreateprojectDto): Promise<Result<string>> => {
        const Project = createproject(data);
        return Projectrepository.create(Project);
      };

      const publish = async (id: string, user_id: string) => {
        const result = await Projectrepository.getById(id, user_id);
        if (!result.success)
          return ResultHandler.failure(result.error.message, result.error.code);
        if (!result.data)
          return ResultHandler.failure("Project not found", "NOT_FOUND");
        const Project = result.data;
        return Projectrepository.update({ ...Project, published_at: new Date() });
      };

      const update = async (data: UpdateprojectDto) => {
        const Project = createproject(data);
    

        if (!canEdit(Project, Project.id))
          return ResultHandler.failure("Can not edit this Project", "UNAUTHORIZED");
    
        return Projectrepository.update(Project);
      };

      const remove = async (id: string, user_id: string) => {
        return Projectrepository.remove(id, user_id);
      };

     


    return {publish,list,create,update,getById,listByUser,remove};
}
// only need this vertifiction for projects for the current model
export const canEdit = (Project: project, user_id: string): boolean =>
    Project.user_id === user_id;

export const projectService = createprojectService(createProjectrepository(db));

export type projectService = ReturnType<typeof createProjectrepository>;
import db from "@/db/db.js";
import { createProjectrepository, type Projectrepository} from "../projects/projectrep.js"
import type { CreateprojectDto, project, UpdateprojectDto } from "../types/project.js";
import type { Data, Result } from "lib/result.js";
import { ResultHandler } from "lib/failures.js";
import { createproject } from "../mappers/projectmapper.js";
import type { HonoEnv } from "../../app.js";
import { projectService } from "../service/index.js";
import { Hono, type Context, type MiddlewareHandler } from "hono";
import type { User } from "../types/users.js";
import { errorResponse } from "lib/error.js";
import { date } from "zod";


export const authenticate = (): MiddlewareHandler => {
    return async function authenticate(c: Context<HonoEnv>, next) {
      const user: User ={
        id:"firstuser",
        name:"testuser"
      }
  
      c.set("user", user);
      await next();
    };
  };

export const createProjectController = (projectService: projectService) => {

    const app = new Hono<HonoEnv>();
    app.use(authenticate());

  app.get("/", async (c) => {
    const user = c.get("user") as User;
    const query = c.req.query();
    const result = await projectService.listByUser(user.id, query);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  app.get("/:id", async (c) => {
    const user = c.get("user") as User;
    const id = c.req.param("id");
    const result = await projectService.getById(id, user.id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });
  

  app.post("/", async (c) => {
    const user = c.get("user") as User;
    const data = await c.req.json();
    const result = await projectService.create({
      ...data,
      userId: user.id,
    });
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json<Data<string>>(result, { status: 201 });
  });



  app.patch("/:id/publish", async (c) => {
    const user = c.get("user") as User;
    const id = c.req.param("id");
    const data = await c.req.json();
    const result = await projectService.update({
        id,
        public:"TRUE",
        ...data,

    }

);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  app.patch("/:id", async (c) => {
    const user = c.get("user") as User;
    const id = c.req.param("id");
    const data = await c.req.json();
    const result = await projectService.update(
      {
        id,
        ...data,
      }
    );
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  app.delete("/:id", async (c) => {
    const user = c.get("user") as User;
    const id = c.req.param("id");
    const result = await projectService.remove(id, user.id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

    return app;
}



export const projectController = createProjectController(projectService);
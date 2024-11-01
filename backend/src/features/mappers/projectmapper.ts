import { date } from "zod";
import type { project, projectdb } from "../types/project.js";
import type { Entries } from "@/types/index.js";
import { createId } from "lib/id.js";





export const fromDb = (project:project) => {
  return {
    id: project.id,
    tittle: project.tittle,
    user_id: project.user_id,
    tag:project.tag,
    published_at:new Date(project.published_at),
    public: project.public,
    status:project.status,
    textinfo:project.textinfo,
  };
};

export const createproject = (project: Partial<project>): project => {
  return {
    id: project.id ?? createId(),
    tittle: project.tittle ?? "",
    user_id: project.user_id ?? "",
    tag:project.tag ?? "",
    published_at:project.published_at ?? new Date(),
    public: project.public ?? "",
    status:project.status ?? "",
    textinfo:project.textinfo ?? "",
  };
};

export const toDb = (data: project) => {
  const project = createproject(data);
  const entries = Object.entries(project) as Entries<project>;
  const projectdb = {} as projectdb;

  for (const entry of entries) {
    if (!entry) continue;
    const [key, value] = entry;
    switch (key) {
      case "id":
        projectdb.id = value;
        break;
      case "tittle":
        projectdb.tittle = value;
        break;
      case "user_id":
        projectdb.user_id = value;
        break;
      case "tag":
        projectdb.tag = value;
        break;
        case "published_at":
          projectdb.published_at = value?.toISOString() ?? null;
          break;
          case "public":
        projectdb.public = value;
        break;
        case "status":
        projectdb.status = value;
        break;
        case "textinfo":
        projectdb.textinfo = value;
        break;
      default:
        break;
    }
  }
  return projectdb;
};
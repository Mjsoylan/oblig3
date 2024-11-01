import { z } from "zod";

export {    projectSchema, projectsSchema };

const projectSchema = z
  .object({
    id:z.string(),
    tittle: z.string(),
    user_id: z.string(),
    tag:z.string(),
    published_at:z.string().datetime(),
    public:z.string(),
    status:z.string(),
    textinfo:z.string(),
  })
const projectsSchema = z.array(projectSchema);

export function validateproject(data: unknown) {
  return projectSchema.safeParse(data);
}
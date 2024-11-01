import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { env, type ServerEnv } from 'lib/env.js'
import { makeLogger, type Logger } from 'lib/logger.js'
import { db, type DB } from './db/db.js'
import type { User } from './features/types/users.js'
import { handleError } from 'lib/error.js'
import { prettyJSON } from 'hono/pretty-json'
import { projectController } from './features/controller/index.js'


type ContextVariables = {
  user: User | null;
};

export type ServiceContext = {
  db: DB;
  logger: Logger;
};

export type HonoEnv = {
  Bindings: ServerEnv;
  Variables: {
    services: ServiceContext;
  } & ContextVariables;
};




export const makeApp = (
  database: DB = db,
  logger: Logger = makeLogger({ logLevel: env.LOG_LEVEL, env: env.NODE_ENV })
) => {
const app = new Hono<HonoEnv>();

app.use(
  "/*",
  cors({
    origin: `${env.FRONTEND_URL}`,
    credentials: true,
  })
);
app.use(prettyJSON());
app.use("*", async (c, next) => {
  c.set("services", {
    logger,
    db: database,
  });

  await next();
  app.route("/v1/projects", projectController);
});


app.onError(handleError);

  return app;
}

const app = makeApp();
export default app;


const port = 3000
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
})

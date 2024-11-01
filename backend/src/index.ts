
import app from "./app.js";
import { serve } from "@hono/node-server";
import { port } from "./config/index.js";

console.log("Starting server on port", port);

serve({
  fetch: app.fetch,
  port,
});
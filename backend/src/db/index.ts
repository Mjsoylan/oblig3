import db from "./db.js";
import { setup } from "./setup.js";


(async () => {
  console.log("seed done")
  await setup(db);
  console.log("seed done")
})();
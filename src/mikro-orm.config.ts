import { MikroORM } from "@mikro-orm/core";
import { __prod__, __dbNAME__, __dbURL__ } from "./constants";
import entities from "./entities/allEntities";

//> Find a way to reference the options parameter directly
const params: Parameters<typeof MikroORM.init>[0] = {
  entities,
  dbName: __dbNAME__,
  type: "mongo",
  debug: !__prod__,
  clientUrl: __dbURL__,
};
export default params;

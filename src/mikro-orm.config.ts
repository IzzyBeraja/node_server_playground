import { __dbName__, __prod__, __dbURL__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";

//> Find a way to reference the options parameter directly
const params: Parameters<typeof MikroORM.init>[0] = {
  entities: [Post],
  dbName: __dbName__,
  type: "mongo",
  debug: !__prod__,
  clientUrl: __dbURL__,
};
export default params;

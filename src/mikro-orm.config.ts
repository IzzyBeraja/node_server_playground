import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import { __prod__, __dbNAME__, __dbURL__ } from "./constants";
import { Passage } from "./entities/Passage";

//> Find a way to reference the options parameter directly
const params: Parameters<typeof MikroORM.init>[0] = {
  entities: [Post, Passage],
  dbName: __dbNAME__,
  type: "mongo",
  debug: !__prod__,
  clientUrl: __dbURL__,
};
export default params;

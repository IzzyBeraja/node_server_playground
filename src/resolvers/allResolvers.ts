import { Resolvers } from "../types";
import { HelloResolver } from "./helloResolver";
import { PostResolver } from "./PostResolver";
import { PassageResolver } from "./PassageResolver";
import { UserResolver } from "./UserResolver";

const Resolvers: Resolvers = [
  HelloResolver,
  PostResolver,
  PassageResolver,
  UserResolver,
];
export default Resolvers;

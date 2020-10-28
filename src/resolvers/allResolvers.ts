import { HelloResolver } from "./helloResolver";
import { PostResolver } from "./PostResolver";
import { PassageResolver } from "./PassageResolver";
import { Resolvers } from "../types";

const Resolvers: Resolvers = [HelloResolver, PostResolver, PassageResolver];
export default Resolvers;

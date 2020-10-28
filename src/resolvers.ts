import { HelloResolver } from "./resolvers/helloResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { PassageResolver } from "./resolvers/PassageResolver";
import { MyResolvers } from "./types";

const Resolvers: MyResolvers = [HelloResolver, PostResolver, PassageResolver];
export default Resolvers;

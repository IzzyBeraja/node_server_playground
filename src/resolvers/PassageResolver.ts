import { Ctx, Query, Resolver } from "type-graphql";
import { Passage } from "../entities/Passage";
import { MyContext } from "../types";

@Resolver()
export class PassageResolver {
  @Query(() => [Passage])
  passages(@Ctx() { em }: MyContext): Promise<Passage[]> {
    return em.find(Passage, {});
  }
}

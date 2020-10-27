import { ObjectId } from "@mikro-orm/mongodb";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Passage } from "../entities/Passage";
import { MyContext } from "../types";

@Resolver()
export class PassageResolver {
  @Query(() => [Passage])
  passages(@Ctx() { em }: MyContext): Promise<Passage[]> {
    return em.find(Passage, {});
  }

  @Query(() => Passage, { nullable: true })
  passage(
    @Arg("id", () => String) id: ObjectId,
    @Ctx() { em }: MyContext
  ): Promise<Passage | null> {
    return em.findOne(Passage, { _id: id });
  }
}

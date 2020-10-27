import { ObjectId } from "@mikro-orm/mongodb";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
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
    @Arg("id", () => String) _id: ObjectId,
    @Ctx() { em }: MyContext
  ): Promise<Passage | null> {
    return em.findOne(Passage, { _id });
  }

  @Mutation(() => Passage)
  async createPassage(
    @Arg("text") text: string,
    @Arg("author", { nullable: true }) author: string,
    @Arg("contributor") contributor: string,
    @Ctx() { em }: MyContext
  ): Promise<Passage> {
    const passage = em.create(Passage, { text, author, contributor });
    await em.persistAndFlush(passage);
    return passage;
  }

  @Mutation(() => Passage, { nullable: true })
  async updatePassage(
    @Arg("id", () => String) _id: ObjectId,
    @Arg("text", { nullable: true }) text: string,
    @Arg("author", { nullable: true }) author: string,
    @Arg("contributor", { nullable: true }) contributor: string,
    @Ctx() { em }: MyContext
  ): Promise<Passage | null> {
    const passage = await em.findOne(Passage, { _id });
    if (!passage) return null;
    passage.text = text ?? passage.text;
    passage.author = author ?? passage.author;
    passage.contributor = contributor ?? passage.contributor;
    await em.persistAndFlush(passage);
    return passage;
  }
}

import { ObjectId } from "@mikro-orm/mongodb";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { Context } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: Context): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => String) _id: ObjectId,
    @Ctx() { em }: Context
  ): Promise<Post | null> {
    return em.findOne(Post, { _id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx() { em }: Context
  ): Promise<Post> {
    const post = em.create(Post, { title });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => String) _id: ObjectId,
    @Arg("title") title: string,
    @Ctx() { em }: Context
  ): Promise<Post | null> {
    const post = await em.findOne(Post, { _id });
    if (!post) return null;
    post.title = title;
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => String) _id: ObjectId,
    @Ctx() { em }: Context
  ): Promise<Boolean> {
    return !!(await em.nativeDelete(Post, { _id }));
  }
}

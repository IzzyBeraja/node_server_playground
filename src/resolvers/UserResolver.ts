import { User } from "../entities/User";
import { Context } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import bcrypt from "bcrypt";
const saltRounts = 10;

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("options") { username, password }: UsernamePasswordInput,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
    //* Check for user, otherwise hash and pass
    if (await em.findOne(User, { username }))
      return {
        errors: [{ field: "username", message: "User is already registered." }],
      };
    const hash = await bcrypt.hash(password, saltRounts);
    const user = em.create(User, { username, password: hash });
    await em.persistAndFlush(user);
    return { user };
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("options") { username, password }: UsernamePasswordInput,
    @Ctx() { em }: Context
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username });
    if (!user)
      return {
        errors: [{ field: "username", message: "User is not registered." }],
      };
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword)
      return {
        errors: [
          {
            field: "password",
            message: "User and password combination do not match.",
          },
        ],
      };
    await em.persistAndFlush(user);
    return { user };
  }
}

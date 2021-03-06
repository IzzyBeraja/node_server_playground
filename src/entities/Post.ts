import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field(() => String)
  @PrimaryKey()
  _id: ObjectId;

  @Field(() => String)
  @Property()
  createdAt = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property()
  title!: string;
}

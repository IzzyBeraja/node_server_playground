import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Passage {
  @Field(() => String)
  @PrimaryKey()
  _id: ObjectId;

  @Field()
  @Property()
  text: string;

  @Field({ nullable: true })
  @Property()
  author: string;

  @Field({ nullable: true })
  @Property()
  contributor: string;

  @Field(() => String)
  @Property()
  dateAdded = new Date();
}

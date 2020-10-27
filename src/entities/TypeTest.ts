import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Passage } from "./Passage";

@Entity()
export class TypeTest {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  userName: string;

  @Property()
  text: Passage;

  @Property()
  completionDate = new Date();

  @Property()
  answers: string[];
}

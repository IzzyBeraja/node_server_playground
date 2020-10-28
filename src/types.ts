import {
  EntityManager,
  IDatabaseDriver,
  Connection,
  AnyEntity,
  EntitySchema,
} from "@mikro-orm/core";
import { EntityClass, EntityClassGroup } from "@mikro-orm/core/typings";

export type Context = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};

export type Resolvers =
  | readonly [Function, ...Function[]]
  | [Function, ...Function[]]
  | readonly [string, ...string[]]
  | [string, ...string[]];

export type Entities =
  | (
      | string
      | EntityClass<AnyEntity<any>>
      | EntityClassGroup<AnyEntity<any>>
      | EntitySchema<any, undefined>
    )[]
  | undefined;

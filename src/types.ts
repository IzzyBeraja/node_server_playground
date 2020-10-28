import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};

export type MyResolvers =
  | readonly [Function, ...Function[]]
  | [Function, ...Function[]]
  | readonly [string, ...string[]]
  | [string, ...string[]];

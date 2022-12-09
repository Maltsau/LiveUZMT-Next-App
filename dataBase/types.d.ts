declare module "lowdb/node" {
  export * from "node_modules/lowdb/lib/node";
  export function JSONFile<T>(path: string): void;
}

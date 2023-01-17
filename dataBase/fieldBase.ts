import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

const fields = new LowSync(
  new JSONFileSync<[string]>(
    "/home/dzmitry/Documents/Work/New/my-app/dataBase/fieldBase.json"
  )
);

export function getFields() {
  fields.read();
  if (fields.data) return fields.data;
  else return [];
}

export function addField(field: string) {
  fields.read();
  if (!fields.data?.includes(field.toUpperCase())) {
    fields.data?.push(field.toUpperCase());
  }
  fields.write();
}

export function searchField(search: string) {
  fields.read();
  const res = fields.data?.filter((item) =>
    item.includes(search.toUpperCase())
  );
  if (res) return res;
  else return [];
}

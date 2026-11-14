import { sql } from "./index";

// Author names, A to Z, for suggestions in the "Add a book" form.
export async function getAuthorNames(): Promise<string[]> {
  const rows = await sql<{ name: string }[]>`select name from authors order by name`;
  return rows.map((row) => row.name);
}

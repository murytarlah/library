import { connection } from "next/server";
import { getAuthorNames } from "@/db/authors";

// Suggestions for the author field, so people pick an existing author instead of retyping one.
export default async function AuthorOptions() {
  await connection();
  const names = await getAuthorNames();
  return (
    <datalist id="author-names">
      {names.map((name) => (
        <option key={name} value={name} />
      ))}
    </datalist>
  );
}

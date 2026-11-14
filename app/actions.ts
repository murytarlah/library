"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/db";

export type AddBookState = {
  ok?: boolean;
  message?: string;
  errors?: { title?: string; author?: string; year?: string };
  values?: { title: string; author: string; year: string };
};

// Trim the ends and squash runs of spaces, so "  Chinua   Achebe " becomes "Chinua Achebe".
function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export async function addBook(_prev: AddBookState, formData: FormData): Promise<AddBookState> {
  const title = clean(formData.get("title"));
  const author = clean(formData.get("author"));
  const yearText = clean(formData.get("year"));
  const values = { title, author, year: yearText };

  // Never trust input: check everything before it touches the database.
  const errors: AddBookState["errors"] = {};
  const thisYear = new Date().getFullYear();

  if (!title) errors.title = "Please enter the book's title.";
  else if (title.length > 200) errors.title = "The title is too long (200 characters at most).";

  if (!author) errors.author = "Please enter the author's name.";
  else if (author.length > 100) errors.author = "The author's name is too long (100 characters at most).";

  const year = Number(yearText);
  if (!yearText) errors.year = "Please enter the year the book was published.";
  else if (!/^\d{3,4}$/.test(yearText) || year < 1000 || year > thisYear)
    errors.year = `Please enter a real year, from 1000 to ${thisYear}.`;

  if (errors.title || errors.author || errors.year) {
    return { ok: false, message: "The book wasn't saved.", errors, values };
  }

  await sql.begin(async (tx) => {
    // Reuse the author if we already have them (ignoring capital letters), otherwise add them once.
    const [existing] = await tx<{ id: string }[]>`
      select id from authors where lower(name) = lower(${author}) limit 1
    `;
    const [added] = existing
      ? [existing]
      : await tx<{ id: string }[]>`
          insert into authors (name) values (${author})
          on conflict (name) do update set name = excluded.name
          returning id
        `;

    await tx`
      insert into books (title, year, author_id)
      values (${title}, ${year}, ${added.id})
    `;
  });

  revalidatePath("/");
  return { ok: true, message: `"${title}" is on the shelf.` };
}

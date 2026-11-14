import { sql } from "./index";

export type Book = {
  id: string;
  title: string;
  year: number | null;
  author: string;
  borrower: string | null;
  due_on: string | null; // "YYYY-MM-DD" while on loan, otherwise null
};

// Every book with its author, plus who has it and when it's due if it's on loan.
// A book is on loan when it has a loan with no returned_on.
export async function getBooks(): Promise<Book[]> {
  return sql<Book[]>`
    select b.id,
           b.title,
           b.year,
           a.name         as author,
           m.name         as borrower,
           l.due_on::text as due_on
    from books b
    join authors a on a.id = b.author_id
    left join loans l on l.book_id = b.id and l.returned_on is null
    left join members m on m.id = l.member_id
    order by b.title
  `;
}

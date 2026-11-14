import { connection } from "next/server";
import { getBooks, type Book } from "@/db/books";

// "2026-11-25" -> "25 Nov 2026". Formatted in UTC so the date never shifts a day.
function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Cloth-bound cover colours. Each book always gets the same one, picked from its title.
const COVERS = ["#7a2e2a", "#23395b", "#2f5a45", "#8a6a1f", "#4f2f55", "#1f5560", "#3b3631", "#8a4b2a"];

function coverColour(title: string) {
  let hash = 0;
  for (const ch of title) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return COVERS[hash % COVERS.length];
}

function BookCover({ book, onLoan }: { book: Book; onLoan: boolean }) {
  return (
    <div className="relative mx-auto flex aspect-[2/3] w-full max-w-[10rem] origin-bottom transition-transform duration-200 hover:-translate-y-1 hover:-rotate-1">
      {/* Cover */}
      <div
        className="relative flex flex-1 flex-col overflow-hidden rounded-r-sm rounded-l-[3px] text-[#f5ecd7] shadow-[3px_4px_10px_rgb(0_0_0/0.35)]"
        style={{ backgroundColor: coverColour(book.title) }}
      >
        <div className="book-spine absolute inset-y-0 left-0 w-3" aria-hidden="true" />
        {/* Gold-tooled frame */}
        <div
          className="pointer-events-none absolute inset-y-2 right-2 left-5 rounded-[2px] border border-[#d9b867]/50"
          aria-hidden="true"
        />
        <div
          className={`relative flex flex-1 flex-col items-center justify-between py-5 pl-7 text-center ${onLoan ? "pr-8" : "pr-4"}`}
        >
          <p className="font-serif text-[0.95rem] leading-tight font-semibold break-words">
            {book.title}
          </p>
          <div className="w-full">
            <div className="mx-auto mb-2 h-px w-8 bg-[#d9b867]/70" aria-hidden="true" />
            <p className="text-[0.65rem] tracking-[0.14em] uppercase opacity-90">{book.author}</p>
            {book.year ? <p className="mt-0.5 text-[0.65rem] opacity-70">{book.year}</p> : null}
          </div>
        </div>
        {/* A ribbon bookmark hangs from books that are out on loan */}
        {onLoan ? (
          <div
            className="absolute top-0 right-4 h-10 w-3 bg-[#d9a95a] [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)]"
            aria-hidden="true"
          />
        ) : null}
      </div>
      {/* Page edges */}
      <div className="book-pages my-1 w-1.5 rounded-r-[2px]" aria-hidden="true" />
    </div>
  );
}

export default async function BookList() {
  await connection(); // read the database on every request, not at build time
  const books = await getBooks();
  const onLoanCount = books.filter((book) => book.borrower).length;

  return (
    <>
      <p className="mt-1 mb-8 text-sm text-muted">
        {books.length} {books.length === 1 ? "book" : "books"} · {onLoanCount} on loan
      </p>

      {books.length === 0 ? (
        <div>
          <p className="py-10 text-center text-muted">The shelves are empty. No books yet.</p>
          <div className="shelf-plank rounded-sm" />
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {books.map((book) => {
            const onLoan = Boolean(book.borrower && book.due_on);
            return (
              <li key={book.id} className="flex flex-col">
                {/* The book stands on the plank; no horizontal gap, so planks join into one shelf */}
                <div className="flex flex-1 items-end px-3 sm:px-4">
                  <BookCover book={book} onLoan={onLoan} />
                </div>
                <div className="shelf-plank" />
                {/* Shelf label */}
                <div className="min-h-[3.25rem] px-2 pt-3 text-center text-xs leading-snug">
                  {onLoan ? (
                    <span className="font-medium text-brass">
                      On loan to {book.borrower}, due {formatDate(book.due_on!)}
                    </span>
                  ) : (
                    <span className="font-semibold tracking-[0.12em] text-forest uppercase">
                      Available
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

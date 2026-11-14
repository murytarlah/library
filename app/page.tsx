import { Suspense } from "react";
import BookList from "./book-list";

function BookListSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading books">
      <div className="mt-2 mb-8 h-4 w-40 animate-pulse rounded bg-rule" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={i >= 2 ? "hidden sm:block" : undefined}>
            <div className="px-3 sm:px-4">
              <div className="mx-auto aspect-[2/3] w-full max-w-[10rem] animate-pulse rounded-sm bg-rule" />
            </div>
            <div className="shelf-plank" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BooksPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-10">
      <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        The Bookshelf
      </h1>
      <Suspense fallback={<BookListSkeleton />}>
        <BookList />
      </Suspense>
    </main>
  );
}

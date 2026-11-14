"use client";

import { useActionState } from "react";
import { addBook, type AddBookState } from "./actions";

const field =
  "w-full rounded-sm border border-rule bg-paper px-3 py-2 text-base text-ink placeholder:text-muted/70 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25 aria-[invalid=true]:border-[#a33a2c]";
const label = "mb-1 block text-xs font-semibold tracking-[0.12em] text-muted uppercase";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-[#a33a2c] dark:text-[#e58a7c]">
      {message}
    </p>
  );
}

export default function AddBookForm() {
  const [state, formAction, pending] = useActionState<AddBookState, FormData>(addBook, {});
  const errors = state.errors ?? {};
  // After a failed save, put back what was typed so nothing has to be retyped.
  const values = state.ok ? undefined : state.values;

  return (
    <section className="mb-10 rounded-md border border-rule bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 font-serif text-xl font-semibold">Add a book</h2>

      <form action={formAction} noValidate className="grid gap-4 sm:grid-cols-[2fr_2fr_1fr_auto] sm:items-start">
        <div>
          <label htmlFor="title" className={label}>
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={values?.title}
            placeholder="Book title"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
            className={field}
          />
          <FieldError id="title-error" message={errors.title} />
        </div>

        <div>
          <label htmlFor="author" className={label}>
            Author
          </label>
          <input
            id="author"
            name="author"
            list="author-names"
            autoComplete="off"
            defaultValue={values?.author}
            placeholder="Author's name"
            aria-invalid={Boolean(errors.author)}
            aria-describedby={errors.author ? "author-error" : undefined}
            className={field}
          />
          <FieldError id="author-error" message={errors.author} />
        </div>

        <div>
          <label htmlFor="year" className={label}>
            Year
          </label>
          <input
            id="year"
            name="year"
            inputMode="numeric"
            defaultValue={values?.year}
            placeholder="e.g. 1987"
            aria-invalid={Boolean(errors.year)}
            aria-describedby={errors.year ? "year-error" : undefined}
            className={field}
          />
          <FieldError id="year-error" message={errors.year} />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-sm bg-forest px-5 py-2 font-semibold text-card transition-opacity hover:opacity-90 disabled:opacity-60 sm:mt-[1.375rem]"
        >
          {pending ? "Shelving…" : "Add to shelf"}
        </button>
      </form>

      <p
        aria-live="polite"
        className={`mt-3 min-h-5 text-sm ${state.ok ? "text-forest" : "text-[#a33a2c] dark:text-[#e58a7c]"}`}
      >
        {state.message}
      </p>
    </section>
  );
}

-- Library Manager schema. Run once in the Supabase SQL Editor, before seed.sql.

create table authors (
  id   bigint generated always as identity primary key,
  name text not null unique check (btrim(name) <> '')
);

create table books (
  id        bigint generated always as identity primary key,
  title     text not null check (btrim(title) <> ''),
  year      integer,
  author_id bigint not null references authors (id)
);

create table members (
  id    bigint generated always as identity primary key,
  name  text not null check (btrim(name) <> ''),
  phone text
);

create table loans (
  id          bigint generated always as identity primary key,
  book_id     bigint not null references books (id) on delete cascade,
  member_id   bigint not null references members (id),
  borrowed_on date not null default current_date,
  due_on      date not null default (current_date + 14),
  returned_on date
);

-- A book can have only one loan that hasn't been returned.
create unique index loans_one_open_loan_per_book
  on loans (book_id)
  where returned_on is null;

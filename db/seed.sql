-- Library Manager starter data. Run once in the Supabase SQL Editor, after schema.sql.

insert into authors (name) values
  ('Chinua Achebe'),
  ('Chimamanda Ngozi Adichie'),
  ('Wole Soyinka'),
  ('Buchi Emecheta'),
  ('C. S. Lewis');

insert into books (title, year, author_id)
select v.title, v.year, a.id
from (values
  ('Things Fall Apart',            1958, 'Chinua Achebe'),
  ('No Longer at Ease',            1960, 'Chinua Achebe'),
  ('Arrow of God',                 1964, 'Chinua Achebe'),
  ('Purple Hibiscus',              2003, 'Chimamanda Ngozi Adichie'),
  ('Half of a Yellow Sun',         2006, 'Chimamanda Ngozi Adichie'),
  ('The Interpreters',             1965, 'Wole Soyinka'),
  ('Aké: The Years of Childhood',  1981, 'Wole Soyinka'),
  ('The Joys of Motherhood',       1979, 'Buchi Emecheta'),
  ('Second-Class Citizen',         1974, 'Buchi Emecheta'),
  ('Mere Christianity',            1952, 'C. S. Lewis')
) as v (title, year, author)
join authors a on a.name = v.author;

insert into members (name, phone) values
  ('Ngozi Okafor',    '08030000001'),
  ('Tunde Bakare',    '08030000002'),
  ('Amaka Eze',       '08030000003'),
  ('Ibrahim Musa',    null),
  ('Funmi Adeyemi',   '08030000005');

insert into loans (book_id, member_id, borrowed_on, due_on)
select b.id, m.id, v.borrowed_on, v.borrowed_on + 14
from (values
  ('Things Fall Apart',    'Ngozi Okafor', current_date - 3),
  ('Half of a Yellow Sun', 'Tunde Bakare', current_date - 10)
) as v (title, member, borrowed_on)
join books   b on b.title = v.title
join members m on m.name  = v.member;

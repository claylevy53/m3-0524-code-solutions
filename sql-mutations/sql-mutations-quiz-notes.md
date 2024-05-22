# sql-mutations-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What are the SQL _CRUD_ operations?

Create, Read, Update, Delete.

- How do you add a row to a SQL table?

INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);

- How do you add multiple rows to a SQL table at once?

INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...), (value1, value2, ...), ...;

- How do you update rows in a database table?

UPDATE table_name SET column1 = value1, column2 = value2, ... WHERE condition;

- How do you delete rows from a database table?

DELETE FROM table_name WHERE condition;

- Why is it important to include a `where` clause in your `update` and `delete` statements?

To avoid modifying or deleting all rows in the table unintentionally.

- How do you accidentally delete or update all rows in a table?

By omitting the WHERE clause in the UPDATE or DELETE statement.

- How do you get back the modified row without a separate `select` statement?

Use the RETURNING clause

- Why did you get an error when trying to delete certain films?

RROR: update or delete on table "films" violates foreign key constraint "film_actor_film_id_fkey" on table "castMembers"
DETAIL: Key (filmId)=(384) is still referenced from table "castMembers".

One of the rows is referencing in another table and cannor be removed

## Notes

All student notes should be written here.

How to write `Code Examples` in markdown

for JS:

```javascript
const data = 'Howdy';
```

for HTML:

```html
<div>
  <p>This is text content</p>
</div>
```

for CSS:

```css
div {
  width: 100%;
}
```

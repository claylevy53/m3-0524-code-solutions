# express-postgres-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is the purpose of the `pg` NPM package?

It is the postgres package and lets you connect express to a postgres database

- How do you tell `pg` which database to connect to?

Specifying the connectionString of the Pool method

- How do you send SQL to PostgreSQL from your Express server?

Using the query method of the db varioable you create from the pg object

- How do you get the rows return from the SQL query?

First set a variable that will capture the results of the sql query. This is asynchronous, so you need to use await.

From this new varible you can use the .rows method to return the rows

- What must you always remember to put around your asynchronous route handlers? Why?

You must always remember to use a middleware or a wrapper function to handle errors properly. This is because unhandled promise rejections in asynchronous code can cause your application to crash if they are not caught and passed to the Express error-handling middleware

- What is a SQL Injection Attack and how do you avoid it in `pg`?
  SQL injection typically exploits vulnerabilities in user inputs that are directly included in SQL queries without proper validation or sanitization

To prevent injection attacks always use parameterized queries or prepared statements.

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

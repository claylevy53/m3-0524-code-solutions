import express from 'express';

import pg from 'pg';

const PORT = 8090;
const app = express();
app.use(express.json());

app.use(express.static('../full-stack-practice/client/public'));

app.listen(PORT, () => {
  console.log(`'Express server listening on port ${PORT}'`);
});

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/fullStackProj',
  ssl: {
    // Allow non-SSL traffic to localhost
    rejectUnauthorized: false,
  },
});

app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `
      select
        *
      from "products"
    `;
    const result = await db.query(sql);
    const products = result.rows;
    res.send(products);
  } catch (err) {
    next(err);
  }
});

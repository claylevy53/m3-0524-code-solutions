import express from 'express';
import { ClientError, errorMiddleware } from './lib/index.js';
import pg from 'pg';

const app = express();

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('listening on port 8080');
});

// only create ONE pool for your whole server.
// Note the database name at the end of the connection string.
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/pagila',
  ssl: {
    // Allow non-SSL traffic to localhost
    rejectUnauthorized: false,
  },
});

// GET /api/films returns the title and filmId of all films in the table, ordered from highest replacement cost to lowest

app.get('/api/films', async (req, res, next) => {
  try {
    const sql = `
      select
        "title",
        "filmId",
        "replacementCost"
      from "films"
      order by "replacementCost" DESC
    `;
    const result = await db.query(sql);
    const films = result.rows;
    res.send(films);
  } catch (err) {
    next(err);
  }
});

// GET /api/film returns a single film, based on filmId. Pass filmId as a query parameter. Return a 404 Not Found if the filmId is not in the database.

app.get('/api/film/:filmId', async (req, res, next) => {
  try {
    const filmId = parseInt(req.params.filmId);
    if (filmId === undefined) {
      throw new ClientError(400, 'filmId is required');
    }
    const sql = `
      select
      "title"
      from "films"
      where
      "filmId" = $1;
      `;
    const params = [filmId];
    const result = await db.query(sql, params);
    const film = result.rows[0];
    if (!film) {
      throw new ClientError(404, `film with id ${filmId} not found`);
    }
    res.send(film);
  } catch (err) {
    next(err);
  }
});

// PUT /api/film updates a single film title, based on filmId. Pass filmId and title as query parameters. Return a success message. Return a 404 Not Found if the filmId is not in the database.

app.put('/api/film', async (req, res, next) => {
  try {
    const { filmId, title } = req.query;

    if (filmId === undefined) {
      throw new ClientError(400, 'filmId is required');
    }
    if (title === undefined) {
      throw new ClientError(400, 'title is required');
    }
    const sql = `
      select
      "title",
      "filmId"
      from "films"
      where
      "filmId" = $1;
      `;

    const params = [filmId];
    const result = await db.query(sql, params);
    const film = result.rows[0];
    if (!film) {
      throw new ClientError(404, `film with id ${filmId} not found`);
    } else {
      console.log(`"Title of ${filmId} updated"`);
    }
    res.send(film);
  } catch (err) {
    next(err);
  }
});

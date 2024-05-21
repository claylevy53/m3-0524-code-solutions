import express from 'express';
import fs from 'fs/promises';
import { errorMiddleware } from './index.js';
import { ClientError } from './client-error.js';

const PORT = 8100;
const app = express();

// Read the JSON file
const jsonData = await fs.readFile('data.json', 'utf8');

// Parse the JSON data
const data = JSON.parse(jsonData);

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});

app.use(express.json());

app.get('/api/notes', (req, res) => {
  res.json(data);
});

app.get('/api/notes/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      throw new ClientError(400, 'id must be a positive integer');
    }

    if (!data.notes[id]) {
      throw new ClientError(404, `Content not found with id ${id}`);
    } else {
      res.json(data.notes[id]);
    }
  } catch (err) {
    next(err);
  }
});

app.post('/api/notes', (req, res, next) => {
  const content = req.body;
  let id = data.nextId;

  try {
    if (content == null) {
      throw new ClientError(400, 'Request body is empty');
    }

    if (content != null) {
      data.notes[id] = {
        id: id,
        content: content,
      };
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFile('data.json', jsonData);
      res.status(201).json(data.notes[id]);
    }
  } catch (error) {
    console.error('Error writing to data.json:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

app.delete('/api/notes/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
      throw new ClientError(400, 'id must be a positive integer');
    }
    if (!data.notes[id]) {
      throw new ClientError(404, `Content not found with id ${id}`);
    }
    if (data.notes[id]) {
      delete data.notes[id];
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFile('data.json', jsonData);
      res.status(204).json(data);
    }
  } catch (error) {
    console.error('Error writing to data.json:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

app.put('/api/notes/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const content = req.body;
  const nextId = data.nextId;

  try {
    if (isNaN(id) || id <= 0 || !Number.isInteger(id) || content === null) {
      throw new ClientError(400, `id of ${id} is not valid`);
    }

    if (!data.notes[id]) {
      throw new ClientError(404, `Content not found with id ${id}`);
    }

    if (data.notes[id]) {
      data.notes[id] = {
        id: id,
        content: content,
      };
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFile('data.json', jsonData);
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error writing to data.json:', error);
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

app.use(errorMiddleware);

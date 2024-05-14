import express from 'express';
import { errorMiddleware, ClientError } from './lib/index.js';

const Note = {};

const app = express();

app.get('/api/notes', async (req, res, next) => {
  try {
    const notes = await readNotes();
    res.send(notes);
  } catch (err) {
    next(err);
  }
});

app.post('/api/notes', async (req, res, next) => {
  try {
    const { content } = req.query;
    if (content === undefined) {
      throw new ClientError(400, 'content is required');
    }
    const note = {
      id: Math.floor(100 * Math.random()),
      content: String(content),
    };
    await writeNote(note);
    res.send(note);
  } catch (err) {
    next(err);
  }
});

app.put('/api/notes', async (req, res, next) => {
  try {
    const { id, content } = req.query;
    if (id === undefined) {
      throw new ClientError(400, 'id is required');
    }
    if (content === undefined) {
      throw new ClientError(400, 'content is required');
    }

    const parsedId = Number(id);

    if (Number.isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId < 1) {
      throw new ClientError(400, 'id must be a positive integer');
    }
    const note = {
      id: parsedId,
      content: String(content),
    };
    await writeNote(note);
    res.send(note);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/notes', async (req, res, next) => {
  try {
    const { id } = req.query;
    if (id === undefined) {
      throw new ClientError(400, 'id is required');
    }
    await deleteNote(+id);
    res.send(`deleted ${id}`);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('listening on port 8080');
});

// Mock data handling functions

async function readNotes() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() >= 0.2
        ? resolve([
            { id: 8, content: 'Error handling middleware is great' },
            { id: 12, content: 'Express is easy!' },
            { id: 3, content: 'Simplicity itself' },
          ])
        : reject(new Error('What bad luck! Read error.'));
    }, 10);
  });
}

async function writeNote(note) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() >= 0.2
        ? resolve(note)
        : reject(new Error('What bad luck! Write error.'));
    }, 10);
  });
}

async function deleteNote(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() >= 0.2
        ? resolve(id)
        : reject(new Error('What bad luck! Delete error.'));
    }, 10);
  });
}

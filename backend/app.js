const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const cors = require("cors")

const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const genresRoutes = require('./routes/genres');

const app = express();

const dbPath = path.join(__dirname, 'bookstore.db');
let db = null;

const attachDBToRequest = (req, res, next) => {
  req.db = db;
  next();
};

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.use(express.json());
    app.use(cors())
    app.use(attachDBToRequest);
    
    app.use('/books', booksRoutes);
    app.use('/authors', authorsRoutes);
    app.use('/genres', genresRoutes);

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log("database connected successfully")
    });
  } catch (e) {
    console.error(`DB Initialization Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const express = require("express");
const router = express.Router();

// GET /authors: Fetch all authors
router.get("/", async (req, res) => {
  const db = req.db;
  try {
    const authors = await db.all("SELECT * FROM Authors");
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /authors: Add a new author
router.post("/", async (req, res) => {
  const { name } = req.body;
  const db = req.db;
  try {
    const result = await db.run(`INSERT INTO Authors (Name) VALUES (?)`, [name]);
    res.status(201).json({ authorId: result.lastID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

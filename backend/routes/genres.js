const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const db = req.db;
  try {
    const genres = await db.all("SELECT * FROM Genres");
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const db = req.db;
  try {
    const result = await db.run(
      `INSERT INTO Genres (Name, Description) VALUES (?, ?)`,
      [name, description]
    );
    res.status(201).json({ genreId: result.lastID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

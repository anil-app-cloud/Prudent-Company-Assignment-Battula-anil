const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const db = req.db;
    const { searchTerm } = req.query; 
    //console.log(searchTerm)
    
    if (!searchTerm) {
      const query = `
        SELECT Books.*, Authors.Name AS AuthorName, Genres.Name AS GenreName
        FROM Books
        JOIN Authors ON Books.AuthorID = Authors.AuthorID
        JOIN Genres ON Books.GenreID = Genres.GenreID
      `;
      try {
        const books = await db.all(query);
        return res.json(books);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    const query = `
      SELECT Books.*, Authors.Name AS AuthorName, Genres.Name AS GenreName
      FROM Books
      JOIN Authors ON Books.AuthorID = Authors.AuthorID
      JOIN Genres ON Books.GenreID = Genres.GenreID
      WHERE Books.Title LIKE ? OR Authors.Name LIKE ? OR Genres.Name LIKE ?
    `;
  
    try {
      const books = await db.all(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
router.post("/", async (req, res) => {
    const { Title, AuthorName, GenreName, Pages, PublishedDate, BookCoverURL, BookCoverDescription } = req.body;
  
    const db = req.db;
    //console.log(AuthorName, "authNmae")
    try {
      const [existingAuthor] = await db.all("SELECT AuthorID FROM Authors WHERE Name = ?", [AuthorName]);
      let authorId;
  
      if (existingAuthor) {
        authorId = existingAuthor.AuthorID;
      } else {
        const authorResult = await db.run("INSERT INTO Authors (Name) VALUES (?)", [AuthorName]);
        authorId = authorResult.lastID;
      }
  

      const [existingGenre] = await db.all("SELECT GenreID FROM Genres WHERE Name = ?", [GenreName]);
      let genreId;
  
      if (existingGenre) {
        genreId = existingGenre.GenreID;
      } else {

        const genreResult = await db.run("INSERT INTO Genres (Name) VALUES (?)", [GenreName]);
        genreId = genreResult.lastID;
      }
  
      const bookResult = await db.run(
        `INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate, BookCoverURL, BookCoverDescription) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [Title, authorId, genreId, Pages, PublishedDate, BookCoverURL, BookCoverDescription]
      );
  
      res.status(201).json({
        status: 201,
        message: "Book added successfully",
        bookId: bookResult.lastID,
        genreId: genreId,
        authorId: authorId
      });
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(200).json({ message: "Failed to add book", error: error.message, status: 500 });
    }
  });
  


  router.put("/:id", async (req, res) => {
    const { Title, AuthorName, GenreName, Pages, PublishedDate, BookCoverURL, BookCoverDescription } = req.body;
    const { id } = req.params;
    const db = req.db;
  
    try {
      let authorRow = await db.get(`SELECT AuthorID FROM Authors WHERE Name = ?`, [AuthorName]);
      let AuthorID = authorRow ? authorRow.AuthorID : null;
  
      if (!AuthorID) {
        const result = await db.run(`INSERT INTO Authors (Name) VALUES (?)`, [AuthorName]);
        AuthorID = result.lastID;
      }
  
      let genreRow = await db.get(`SELECT GenreID FROM Genres WHERE Name = ?`, [GenreName]);
      let GenreID = genreRow ? genreRow.GenreID : null;
  
      if (!GenreID) {
        const result = await db.run(`INSERT INTO Genres (Name) VALUES (?)`, [GenreName]);
        GenreID = result.lastID
      }

      await db.run(
        `UPDATE Books 
         SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ?, BookCoverURL = ?, BookCoverDescription = ?
         WHERE BookID = ?`,
        [Title, AuthorID, GenreID, Pages, PublishedDate, BookCoverURL, BookCoverDescription, id]
      );
  
      res.json({ message: "Book updated successfully", status: 201 });
    } catch (error) {
      res.status(200).json({ message: error.message, status: 500 });
      console.log(error.message)
    }
  });
  
  

  
  

router.delete("/:id", async (req, res) => {
  
  const { id } = req.params;
  const db = req.db;
  try {
    await db.run(`DELETE FROM Books WHERE BookID = ?`, [id]);
    res.json({ message: "Book deleted successfully", status: 200 });
  } catch (error) {
    res.status(200).json({ error: error.message, status: 500 });
  }
});

module.exports = router;

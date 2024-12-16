const Database = require('better-sqlite3');


const db = new Database('bookstore.db', { verbose: console.log });

// Create tables if they don't exist

db.exec(`
  CREATE TABLE IF NOT EXISTS Authors (
    AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Genres (
    GenreID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT
  );

  CREATE TABLE IF NOT EXISTS Books (
    BookID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    AuthorID INTEGER NOT NULL,
    GenreID INTEGER NOT NULL,
    Pages INTEGER,
    PublishedDate TEXT,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
  );


`);

// db.exec(`
//     ALTER TABLE Books ADD COLUMN BookCoverURL TEXT;
//     ALTER TABLE Books ADD COLUMN BookCoverDescription TEXT;
//   `);


// const insertDummyData = () => {
//     // Insert authors
//     db.run("INSERT INTO Authors (Name) VALUES ('B.Anil Kumar')");
//     db.run("INSERT INTO Authors (Name) VALUES ('Ch.Subbu')");
//     db.run("INSERT INTO Authors (Name) VALUES ('T.Gopi')");
//     db.run("INSERT INTO Authors (Name) VALUES ('Ch.Nari')");
//     db.run("INSERT INTO Authors (Name) VALUES ('O.Lakshman')");
  
//     // Insert genres
//     db.run("INSERT INTO Genres (Name, Description) VALUES ('Fantasy', 'Fantasy genre with magical or supernatural elements.')");
//     db.run("INSERT INTO Genres (Name, Description) VALUES ('Mystery', 'Mystery genre with crime-solving and suspense.')");
//     db.run("INSERT INTO Genres (Name, Description) VALUES ('Adventure', 'Adventure genre with exciting journeys and explorations.')");
//     db.run("INSERT INTO Genres (Name, Description) VALUES ('Horror', 'Horror genre focused on fear and the supernatural.')");
//     db.run("INSERT INTO Genres (Name, Description) VALUES ('Science Fiction', 'Science fiction with futuristic concepts and technology.')");
  
//     // Insert books
//     db.run(`INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate, BookCoverURL, BookCoverDescription) 
//             VALUES ('Harry Potter and the Philosophers Stone', 1, 1, 223, '2024-06-26', 'https://example.com/harry-potter-cover.jpg', 'A magical journey begins with Harry Potter on his first adventure.')`);
//     db.run(`INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate, BookCoverURL, BookCoverDescription) 
//             VALUES ('A Game of Thrones', 2, 1, 694, '2024-08-06', 'https://example.com/game-of-thrones-cover.jpg', 'The epic tale of Westeros begins with a game of thrones.')`);
//     db.run(`INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate, BookCoverURL, BookCoverDescription) 
//             VALUES ('The Lord of the Rings: The Fellowship of the Ring', 3, 1, 423, '2024-07-29', 'https://example.com/lord-of-the-rings-cover.jpg', 'An epic fantasy adventure where a hobbit leads a quest to destroy a powerful ring.')`);
//     db.run(`INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate, BookCoverURL, BookCoverDescription) 
//             VALUES ('Murder on the Orient Express', 4, 2, 256, '2024-01-01', 'https://example.com/murder-orient-express-cover.jpg', 'Detective Hercule Poirot solves a murder mystery aboard the famous train.')`);
//     db.run(`INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate, BookCoverURL, BookCoverDescription) 
//             VALUES ('The Shining', 5, 4, 659, '2024-01-28', 'https://example.com/shining-cover.jpg', 'A chilling tale of isolation and terror set in a haunted hotel.')`);
  
//     console.log('Dummy data inserted into database.');
//   };
  
//   insertDummyData();


module.exports = db;

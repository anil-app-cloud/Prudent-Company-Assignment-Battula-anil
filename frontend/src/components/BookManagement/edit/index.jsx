import axios from "axios";
import "./index.css";
import { useGlobalContext } from "../../../context";
import { useState } from "react";

const EditBook = () => {
  const {toggleEditButton, bookForEdit, updateBookForRender} = useGlobalContext()
  const book = bookForEdit
  //console.log(book, "form edit")
  const bookId = book.id 
  const authorId = book.authorId
  const genreId = book.genreId
  //console.log(book, "genre")
  const [authorName, setAuthorName] = useState(book.authorName)
  const [title, setTitle] = useState(book.title)
  const [coverUrl, setCoverUrl] = useState(book.cover_img)
  const [description, setDescription] = useState(book.description)
  const [genreType, setGenreType] = useState(book.genreName)
  const [pages, setPages] = useState(book.Pages)
  const [publishedDate, setPublishedDate] = useState(book.first_publish_year)
  const [errorMsg, setErrorMsg] = useState("")

  const getBack = () => {
    toggleEditButton(false)
  }
  
  const getSubmitBook = async (e) => {
    e.preventDefault()
    let newBook = {BookID: bookId,AuthorID:authorId, GenreID: genreId, AuthorName: authorName, Title: title, GenreName: genreType, BookCoverDescription: description, Pages: pages, BookCoverURL: coverUrl, PublishedDate: publishedDate}

    try{
      const response = await axios.put(
        `http://localhost:5000/books/${bookId}`,
        newBook, 
      {headers: { "Content-Type": "application/json" }} 
      );
      console.log(response.data, "response data")
      if (response.data.message === "Book updated successfully"){
        updateBookForRender({id: bookId, authorId, genreId, authorName, title, genreName: genreType, description, Pages: pages, cover_img: coverUrl, first_publish_year: publishedDate})
        getBack()
      }else{
        setErrorMsg(response.data.message)
        console.log("error, while adding")
      }
    }catch(error){
      setErrorMsg(error.message)
      console.log("error, while adding")
    }
    
  }
  return (
    <div>
      <div className="book-add-popup">
        <div className="book-add-form">
          <h2 className="text-balck">Add book</h2>
          <form onSubmit={getSubmitBook}>
            <label>
              book Name:
              <input
                type="text"
                placeholder="Enter book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={description}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <label>
              Cover Url:
              <input
                type="text"
                value={coverUrl}
                placeholder="Enter Image Url"
                onChange={(e) => setCoverUrl(e.target.value)}
                required
              />
            </label>
            <label>
              Genretype:
              <input
                type="text"
                value={genreType}
                placeholder="Enter Genretype"
                onChange={(e) => setGenreType(e.target.value)}
                required
              />
            </label>
            <label>
              Pages:
              <input
                type="number"
                value={pages}
                placeholder="Enter Pages"
                onChange={(e) => setPages(e.target.value)}
                required
              />
            </label>
            <label>
            PublishedDate:
              <input
                type="Text"
                value={publishedDate}
                placeholder="Enter PublishedDate"
                onChange={(e) => setPublishedDate(e.target.value)}
                required
              />
            </label>
            <center>
              <p id="error-msg">{errorMsg}</p>
            </center>
            <div className="button-container">
              <button type="submit">
                Submit
              </button>
              <button type="button" onClick={getBack}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;

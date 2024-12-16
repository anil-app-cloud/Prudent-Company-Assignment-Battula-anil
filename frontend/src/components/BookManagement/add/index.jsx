import axios from "axios";
import "./index.css";
import { useGlobalContext } from "../../../context";
import { useState } from "react";

const AddBook = () => {
  const {toggleAddBook, fetchBooks} = useGlobalContext()
  const [authorName, setAuthorName] = useState("")
  const [title, setTitle] = useState("")
  const [coverUrl, setCoverUrl] = useState("")
  const [description, setDescription] = useState("")
  const [genreType, setGenreType] = useState("")
  const [pages, setPages] = useState(0)
  const [publishedDate, setPublishedDate] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const getBack = () => {
    toggleAddBook(false)
  }
  
  const getSubmitBook = async (e) => {
    e.preventDefault()
    let newBook = {AuthorName: authorName, Title: title, GenreName: genreType, BookCoverDescription: description, Pages: pages, BookCoverURL: coverUrl, PublishedDate: publishedDate}

    try{
      const response = await axios.post(
        "http://localhost:5000/books",
        newBook, 
      {headers: { "Content-Type": "application/json" }} 
      );
      //console.log(response.data, "response data")
      if (response.data.message === "Book added successfully"){
        fetchBooks()
        getBack()
      }else{
        setErrorMsg(response.data.message)
        console.log("error, while adding")
      }
    }catch(error){
      setErrorMsg(error.message)
      console.log("error, while adding")
    }
    
    
    setAuthorName("")
    setCoverUrl("")
    setDescription("")
    setPages(0)
    setTitle("")
    setPublishedDate("")
    setGenreType("")
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
              AuthorName:
              <input
                type="text"
                value={authorName}
                placeholder="Enter AuthorName"
                onChange={(e) => setAuthorName(e.target.value)}
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

export default AddBook;

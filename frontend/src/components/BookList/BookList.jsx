import React from 'react';
import { useGlobalContext } from '../../context';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import EditBook from "../BookManagement/edit"
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";


const BookList = () => {
  const {books, renderdBooks, loading, resultTitle, isAddButtonClicked, currentPage, setPages, showEditcard} = useGlobalContext();
  const booksWithCovers = renderdBooks.map((singleBook) => {
    return {
      ...singleBook,
      cover_img:coverImg
    }
  });
  //console.log(isAddButtonClicked, "form bookilist")

  if(loading) return <Loading />;

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {
            booksWithCovers.map((item, index) => {
              return (
                <Book key = {index} {...item} />
              )
            })
          }
        </div>
      </div>
      <div className='pagination-card'>
        <button className='pagination-button' onClick={() => setPages(false)}>Previous</button>
        <div>{currentPage}</div>
        <button className='pagination-button' onClick={() => setPages(true)}>Next</button>
      </div>
      {showEditcard && <EditBook />}
    </section>
  )
}

export default BookList
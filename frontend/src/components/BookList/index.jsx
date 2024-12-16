import React from 'react';
import { useGlobalContext } from '../../context';
import Book from "./Book";
import Loading from "../Loader";
import EditBook from "../BookManagement/edit"
import "./index.css";


const BookList = () => {
  const {renderdBooks, loading, resultTitle, currentPage, setPages, showEditcard} = useGlobalContext();
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
            renderdBooks.map((item, index) => {
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
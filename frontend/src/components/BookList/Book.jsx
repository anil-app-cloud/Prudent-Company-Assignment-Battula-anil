import React from 'react';
import { Link } from 'react-router-dom';

import "./BookList.css";
import { useGlobalContext } from '../../context';

const Book = (book) => {
  const {toggleEditButton, getBookForEdit} = useGlobalContext()
    const getEditBook = () => {
      toggleEditButton(true)
      getBookForEdit(book)

    }
  return (
    
      <div className='book-item flex flex-column flex-sb'>
      <div className='edit-btns'>
          <button className='book-edit-btn' onClick={getEditBook}><i className="fa-solid fa-pen" ></i></button>
          <button className='book-delete-btn'><i className="fa-sharp fa-solid fa-trash"></i></button>
      </div>
        <Link to = {`/book/${book.id}`} book>
        <div className='book-item-img'>
          <img src = {book.cover_img} alt = "cover" />
        </div>
        <div className='book-item-info text-center'>
            <div className='book-item-info-item title fw-7 fs-18'>
              <span>{book.title}</span>
            </div>

          <div className='book-item-info-item author fs-15'>
            <span className='text-capitalize fw-7'>Author: </span>
            <span>{book.authorName}</span>
          </div>
          <div className='book-item-info-item author fs-15'>
            <span className='text-capitalize fw-7'>Genre: </span>
            <span>{book.genreName}</span>
          </div>
          <div className='book-item-info-item edition-count fs-15'>
            <span className='text-capitalize fw-7'>Total Pages: </span>
            <span>{book.Pages}</span>
          </div>

          <div className='book-item-info-item publish-year fs-15'>
            <span className='text-capitalize fw-7'>First Publish Year: </span>
            <span>{book.first_publish_year}</span>
          </div>
        </div>
        </Link >
      </div>
    
  )
}

export default Book
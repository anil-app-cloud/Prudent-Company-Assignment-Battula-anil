import React from 'react';
import { Link } from 'react-router-dom';
import coverImg from "../../images/cover_not_found.jpg";
import { FaTrash, FaPen } from 'react-icons/fa';
import DeleteBook from '../BookManagement/delete';
import "./index.css";
import { useGlobalContext } from '../../context';

const Book = (book) => {
  const {toggleEditButton, getBookForEdit,getDeleteBookForm, shownDeleteForm} = useGlobalContext()
    const getEditBook = () => {
      toggleEditButton(true)
      getBookForEdit(book)

    }
  return (
    
      <div className='book-item flex flex-column flex-sb'>

      <div className='edit-btns'>
          <button className='book-edit-btn' onClick={getEditBook}><FaPen /></button>
          <button className='book-delete-btn' onClick={() => getDeleteBookForm(true)}><FaTrash /></button>
      </div>
        <Link to = {`/book/${book.id}`} book>
        <div className='book-item-img'>
          <img src = {book.cover && book.cover !== "" ? book.cover : coverImg} alt = "cover" />
        </div>
        <div className='book-item-info text-center'>
            <div className='book-item-info-item title fw-7 fs-18'>
              <span>{book.title}</span>
            </div>

          <div className='book-item-info-item author fs-15'>
            <span className='text-capitalize fw-7'>Genre: </span>
            <span>{book.genreName}</span>
          </div>
        </div>
        </Link >
        {shownDeleteForm && <DeleteBook book = {book}/>}
      </div>
    
  )
}

export default Book
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./index.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const BookDetails = () => {
  const { id } = useParams();
  const { books } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const getBook = () => {
    setLoading(true);
    const filteredBook = books.find((eachBook) => eachBook.id === parseInt(id)); 
    console.log(filteredBook, "from getBook")
    setBook(filteredBook || null); 
    setLoading(false);
  };

  useEffect(() => {
    getBook();
  }, [id, books]);

  if (loading) return <Loading />;

  if (!book) return <div>No book found</div>; 

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img 
              src={book.cover && book.cover !== "" ? book.cover : coverImg}
              alt="cover img" 
            />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
            <span className='text-capitalize fw-7'>Description: </span>
              <span>{book?.description}</span>
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
        </div>
      </div>
    </section>
  );
};

export default BookDetails;

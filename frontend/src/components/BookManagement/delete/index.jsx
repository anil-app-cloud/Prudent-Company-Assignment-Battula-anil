import axios from "axios";
import "./index.css";
import { useGlobalContext } from "../../../context";

const DeleteBook = (props) => {
    const {book} = props
  const {getDeleteBookForm, fetchBooks} = useGlobalContext()

  const deleteBook = async () => {
        try{
          const response = await axios.delete(
            `http://localhost:5000/books/${book.id}`,
            {headers: { "Content-Type": "application/json" }} 
          )
    
          // console.log(response.data, "from delete api response")
          if (response.data.message === "Book deleted successfully"){
            getDeleteBookForm(false)

            fetchBooks()
          }
        }catch(error){
          console.log("error while deleteing: ", error.message)
        }
        
      }
  return (
    <div>
      <div className="book-delete-popup">
        <div className="book-delete-form">
          <h2 className="text-balck">Want to delete book?</h2>
          <div className="button-container">
              <button type="submit" onClick={() => deleteBook()}>
                Yes
              </button>
              <button type="button" onClick={() => getDeleteBookForm(false)}>
                NO
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;

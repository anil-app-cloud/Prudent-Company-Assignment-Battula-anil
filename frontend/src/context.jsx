import React, {useState, useContext, useEffect} from 'react';
import axios from "axios";
import { useCallback } from 'react';
const URL = "http://openlibrary.org/search.json?title=";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [upperPagesRange, setupperPagesRange] = useState(15)
    const [lowerPagesRange, setLowerPagesRange] = useState(0)
    const [renderdBooks, setRenderedBooks] = useState([])
    const [currentPage, setCurrentPage]  = useState(1)
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");
    const [isAddButtonClicked, setisAddButtonClicked] = useState(false)
    const [showEditcard, setShowEditCard] = useState(false)
    const [bookForEdit, setBookForEdit] = useState({})

    const getBookForEdit = (value) => {
        setBookForEdit(value)
    }

    const updateBookForRender = (value) => {

        const newListBooks = renderdBooks.map(eachbook => {
            if (eachbook.id === value.id){
                return value
            }else{
                return eachbook
            }
        })
        setRenderedBooks(newListBooks)

    }
    

    const toggleEditButton = (value) => {
        setShowEditCard(value)
    }


    const setPages = (value) => {
        if (value){
            if (upperPagesRange <= books.length){
                setCurrentPage(prev => prev += 1)
                setLowerPagesRange(prev => prev + 15)
                setupperPagesRange(prev => prev + 15)
            }
            
            
        }else{
            if (lowerPagesRange > 1){
                setCurrentPage(prev => prev -= 1)
                setupperPagesRange(prev => prev - 15)
                setLowerPagesRange(prev => prev - 15)
                
            }
        }
    }
    
    const toggleAddBook = (value) => {
        setisAddButtonClicked(value)
    }
    const addNewBook = (newBook) => {
        console.log(newBook, "newbook")
        const addingBook =  {
            id: newBook.bookID,
            authorId: newBook.guthorID,
            genreId: newBook.genreID,
            description: newBook.BookCoverDescription,
            cover:newBook.BookCoverURL,
            Pages: newBook.Pages,
            first_publish_year: newBook.PublishedDate,
            title: newBook.Title,
            authorName: newBook.AuthorName,
            genreName: newBook.GenreName
        }
        const updatedBooks= books.push(addingBook)
        // console.log(addingBook, "new book")
        // console.log(books, "books")
        // console.log(updatedBooks, "updat")
        setBooks(prev => (prev))
    }
    const URL = 'http://localhost:5000/books'
    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try{
            const response = await fetch(searchTerm ?`${URL}?searchTerm=${searchTerm}`: URL);
            const data = await response.json();
            console.log(data)
            if(data){
                const newBooks = data.map((bookSingle) => {
                    const {BookID, AuthorID, GenreID, BookCoverDescription, BookCoverURL, Title, PublishedDate, Pages, AuthorName,GenreName} = bookSingle;

                    return {
                        id: BookID,
                        authorId: AuthorID,
                        genreId: GenreID,                       
                        description: BookCoverDescription,
                        cover:BookCoverURL,
                        Pages: Pages,
                        first_publish_year: PublishedDate,
                        title: Title,
                        authorName: AuthorName,
                        genreName: GenreName
                    }
                });
                setBooks((prev) => newBooks);
                renderdBooks()
                

                if(newBooks.length > 1){
                    setResultTitle("Your Search Result");
                } else {
                    setResultTitle("No Search Result Found!")
                }
            } else {
                setBooks([]);
                setResultTitle("No Search Result Found!");
            }
            setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchBooks();
    }, [searchTerm, fetchBooks]);

    useEffect(() => {
        const booksForRender = books.slice(lowerPagesRange, upperPagesRange+1)
        //console.log(booksForRender, "books for render") 
        setRenderedBooks(booksForRender)
    }, [books, upperPagesRange, lowerPagesRange, currentPage])

    return (
        <AppContext.Provider value = {{
            loading, 
            books, 
            setSearchTerm, 
            resultTitle, 
            setResultTitle,
            isAddButtonClicked,
            toggleAddBook, 
            addNewBook, 
            renderdBooks,
            setPages, 
            currentPage,
            showEditcard,
            toggleEditButton,
            getBookForEdit,
            bookForEdit, 
            updateBookForRender

        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};
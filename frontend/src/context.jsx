import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [upperPagesRange, setUpperPagesRange] = useState(15)
    const [lowerPagesRange, setLowerPagesRange] = useState(0)
    const [renderdBooks, setRenderedBooks] = useState([])
    const [currentPage, setCurrentPage]  = useState(1)
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("Books");
    const [isAddButtonClicked, setisAddButtonClicked] = useState(false)
    const [showEditcard, setShowEditCard] = useState(false)
    const [bookForEdit, setBookForEdit] = useState({})
    const [shownDeleteForm, setShownDeleteForm] = useState(false)
    const URL = 'http://localhost:5000/books'

    const getBookForEdit = (value) => {
        setBookForEdit(value)
    }

    const getDeleteBookForm = (value) => {
        setShownDeleteForm(value)
    }

    const toggleEditButton = (value) => {
        setShowEditCard(value)
    }


    const setPages = (value) => {
        if (value){
            if (upperPagesRange <= books.length){
                setCurrentPage(prev => prev += 1)
                setLowerPagesRange(prev => prev + 15)
                setUpperPagesRange(prev => prev + 15)
            }
            
            
        }else{
            if (lowerPagesRange > 1){
                setCurrentPage(prev => prev -= 1)
                setUpperPagesRange(prev => prev - 15)
                setLowerPagesRange(prev => prev - 15)
                
            }
        }
    }
    
    const toggleAddBook = (value) => {
        setisAddButtonClicked(value)
    }

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
            renderdBooks,
            setPages, 
            currentPage,
            showEditcard,
            toggleEditButton,
            getBookForEdit,
            bookForEdit, 
            fetchBooks,
            shownDeleteForm,
            getDeleteBookForm

        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};
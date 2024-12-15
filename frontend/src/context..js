import React, {useState, useContext, useEffect} from 'react';
import { useCallback } from 'react';
const URL = "http://localhost:5000/books";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");
    const [isAddButtonClicked, setisAddButtonClicked] = useState(false)

    const toggleAddBook = (value) => {
       // console.log(toggleAddBook, "from context toogle book")
        setisAddButtonClicked(value)
    }
    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try{
            const response = await fetch(searchTerm ? `${URL}?${searchTerm}`: URL);
            const data = await response.json();
            //console.log(isAddButtonClicked, "form context")

            if(data){
                const newBooks = data.map((bookSingle) => {
                    const {
                        AuthorID
                        , 
                        AuthorName
                        , 
                        BookCoverDescription
                        , 
                        BookCoverURL, 
                        BookID, 
                        GenreID
                        , 
                        GenreName,
                        Pages,
                        PublishedDate,
                        Title} = bookSingle;

                    return {
                        id: BookID,
                        author: AuthorName,
                        bookUrl: BookCoverURL,
                        pages: Pages,
                        first_publish_year: PublishedDate,
                        title: Title,
                        genreName: GenreName,
                        genreID: GenreID,
                        description: BookCoverDescription
                    }
                });

                setBooks(newBooks);

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

    return (
        <AppContext.Provider value = {{
            loading, books, setSearchTerm, resultTitle, setResultTitle,isAddButtonClicked, toggleAddBook,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider};
import React from 'react';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context';
import './App.css';
import Home from './pages/Home';
import About from "./pages/About/";
import ContactMe from './pages/Contact';
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes> 
            <Route path = "/" element = {<Home />}>
              <Route path = "/about" element = {<About />} />
              <Route path = "/book" element = {<BookList />} />
              <Route path = "/book/:id" element = {<BookDetails />} />
              <Route path = "/contact" element = {<ContactMe />} />
            </Route>
          
        </Routes>    
      </BrowserRouter>
  </AppProvider>
  );
}

export default App;

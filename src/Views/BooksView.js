import React, { useEffect, useState } from "react";
import Books from "../components/Books/Books";
import SearchBar from "../components/SearchBar/SearchBar";
import BookContext from "../Store/book-store";

const BooksView = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllBooks = async () => {
      let response = await fetch("http://localhost:4000/api/books");
      response = await response.json();
      setBooks(response.data.books);
    };
    fetchAllBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  return (
    <BookContext.Provider value={{ books: filteredBooks }}>
      <SearchBar onSearch={searchChangeHandler} />
      <Books books={filteredBooks} />
    </BookContext.Provider>
  );
};

export default BooksView;

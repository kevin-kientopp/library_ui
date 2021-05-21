import React, { useEffect, useState } from "react";
import Books from "../components/Books/Books";
import AddBook from "../components/AddBook/AddBook";
import LibrarySearchBar from "../components/SearchBar/SearchBar";

const BooksView = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/api/books`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => console.log(error));
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

  const onAddBookHandler = (newBook) => {
    setBooks((prevBooksList) => {
      return [...prevBooksList, newBook];
    });
  };

  const searchChangeHandler = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <AddBook onComplete={onAddBookHandler} />
      <LibrarySearchBar onSearch={searchChangeHandler} />
      <Books books={filteredBooks} />
    </>
  );
};

export default BooksView;

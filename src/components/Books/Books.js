import React from "react";
import BookTile from "./BookTile";

const Books = (props) => {
  return (
    <div>
      {props.books.map((book) => (
        <BookTile
          key={book.id}
          title={book.title}
          thumbnailUrl={book.thumbnailUrl}
          isbn10={book.isbn10}
          isbn13={book.isbn13}
          pageCount={book.pageCount}
          author={book.author}
          description={book.description}
        />
      ))}
    </div>
  );
};

export default Books;

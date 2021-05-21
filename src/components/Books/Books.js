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
        />
      ))}
    </div>
  );
};

export default Books;

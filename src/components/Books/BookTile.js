import React from "react";
import bookTitleStyles from "./BookTile.module.css";

const BookTile = (props) => {
  return (
    <div className={bookTitleStyles.cover}>
      <img
        src={props.thumbnailUrl}
        alt={props.title}
        className={bookTitleStyles.coverImage}
      />
      <div className={bookTitleStyles.coverTitle}>{props.title}</div>
    </div>
  );
};

export default BookTile;

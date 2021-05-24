import React, { useState } from "react";
import bookTitleStyles from "./BookTile.module.css";

const BookTile = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleTitleClick = (event) => {
    event.preventDefault();
    setExpanded((prevState) => {
      return !prevState;
    });
  };

  return (
    <React.Fragment>
      {expanded ? (
        <div className={bookTitleStyles.detail}>
          <div className={bookTitleStyles.bookExpandedControls}>
            <div className="controls_wrapper">
              <div className="add_title" title="Edit">
                <div className="sprite" />
                <span>Edit</span>
              </div>
              <div className="add_tags" title="Tags">
                <div className="sprite" />
                <span>Tags</span>
              </div>
              <div className="delete_book" id="delete_56393132">
                <div className="sprite" title="Delete" />
                <span className="delete_join">Delete</span>
              </div>
            </div>
          </div>
          <div className={bookTitleStyles.bookFinds} id="join_56393132">
            <div className={bookTitleStyles.bookImage}>
              <div className="cover_image_wrapper dropzone_attached">
                <img src={props.thumbnailUrl} alt="" />
              </div>
            </div>
            <div className={bookTitleStyles.bookInfo}>
              <p
                className="book_title"
                style={{ cursor: "pointer" }}
                onClick={handleTitleClick}
              >
                {props.title}
              </p>
              <p className="book_authors">{props.author}</p>
              <p className="book_data">{props.pageCount} Pages</p>
              <p className="book_data" id="identification_numbers" />
              <p className="book_data" id="identification_numbers2">
                <strong>ISBN 13:</strong> {props.isbn13}{" "}
                <strong>ISBN 10:</strong>
                {props.isbn10}
              </p>
              <div className="clearfix" />
              <p className={bookTitleStyles.bookDescription}>
                {props.description}
              </p>
              <br />
              <div className="clear" />
            </div>
            <div className="clear" />
          </div>
        </div>
      ) : (
        <div className={bookTitleStyles.cover} onClick={handleTitleClick}>
          <img
            src={props.thumbnailUrl}
            alt={props.title}
            className={bookTitleStyles.coverImage}
          />
          <div className={bookTitleStyles.coverTitle}>{props.title}</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BookTile;

import React from "react";

const Authors = (props) => {
  return (
    <div>
      {props.authors.map((author) => (
        <li key={author.id}>
          {author.firstName} {author.lastName}
        </li>
      ))}
    </div>
  );
};

export default Authors;

import React, { useEffect, useState } from "react";

const Authors = (props) => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/api/authors`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setAuthors(response.data.authors);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {authors.map((author) => (
        <li key={author.id}>
          {author.firstName} {author.lastName}
        </li>
      ))}
    </div>
  );
};

export default Authors;

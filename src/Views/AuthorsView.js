import React, { Component } from "react";
import Content from "../components/Content/Content";
import AddAuthor from "../components/AddAuthor/AddAuthor";
import Authors from "../components/Authors/Authors";

class AuthorsView extends Component {
  render() {
    return (
      <div>
        <Content>
          {/*<AddAuthor />*/}
          <Authors />
        </Content>
      </div>
    );
  }
}

export default AuthorsView;

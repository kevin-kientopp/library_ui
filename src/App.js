import React from "react";
import { Column, Row } from "simple-flexbox";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import styles from "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthorsView from "./Views/AuthorsView";
import BooksView from "./Views/BooksView";
import TimelineView from "./Views/TimelineView";
import AddBooksView from "./Views/AddBooksView";
import BookContext from "./Store/book-store";

class App extends React.Component {
  state = { selectedItem: "TimelineView" };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize = () => this.forceUpdate();

  render() {
    const { selectedItem } = this.state;
    return (
      <Router>
        <BookContext.Provider value={{ books: [] }}>
          <Row className={styles.container}>
            <Sidebar
              selectedItem={selectedItem}
              onChange={(selectedItem) => this.setState({ selectedItem })}
            />
            <Column flexGrow={1} className={styles.mainBlock}>
              <Header title={selectedItem} />
              <div className={styles.content}>
                <Switch>
                  <Route path="/timeline" component={TimelineView} />
                  <Route path="/books" component={BooksView} />
                  <Route path="/add-books" component={AddBooksView} />
                  <Route path="/authors" component={AuthorsView} />
                </Switch>
              </div>
            </Column>
          </Row>
        </BookContext.Provider>
      </Router>
    );
  }
}

export default App;

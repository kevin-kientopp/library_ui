import React from "react";
import { Column, Row } from "simple-flexbox";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import styles from "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthorsView from "./Views/AuthorsView";
import BooksView from "./Views/BooksView";
import TimelineView from "./Views/TimelineView";
import AddBooksView from "./Views/AddBooksView";
import BookContext from "./Store/book-store";

const routes = [
  {
    path: "/authors",
    Component: AuthorsView,
  },
  {
    path: "/books",
    Component: BooksView,
  },
  { path: "/timeline", Component: TimelineView },
  {
    path: "/add-books",
    Component: AddBooksView,
  },
];
class App extends React.Component {
  state = { selectedItem: "Timeline", books: [], booksFetched: false };

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  componentDidUpdate() {
    if (this.state.selectedItem === 'Books' && !this.state.booksFetched) {
      const fetchAllBooks = async () => {
        let response = await fetch("http://localhost:4000/api/books");
        response = await response.json();
        console.log('response =', response);
        this.setState({ books: response.data.books, booksFetched: true });
      };
      fetchAllBooks();
    }
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
                {routes.map(({ path, Component }) => (
                  <Route key={path} path={path} render={() => <Component books={this.state.books} />} />
                ))}
              </div>
            </Column>
          </Row>
        </BookContext.Provider>
      </Router>
    );
  }
}

export default App;

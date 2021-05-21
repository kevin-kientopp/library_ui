import React, { forwardRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddBook = (props) => {
  const [open, setOpen] = useState(false);
  const [helperText, setHelperText] = useState(
    "Enter a 13 or 10 digit ISBN number"
  );
  const [error, setError] = useState(false);
  const [isbnNumber, setIsbnNumber] = useState("");

  const classes = useStyles();
  const handleAddBook = async (evt) => {
    evt.preventDefault();

    let response = await fetch("http://localhost:4000/api/books", {
      method: "POST",
      body: JSON.stringify({ isbn: isbnNumber }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response;
    console.log(response);
    if (response.status === 200) {
      const responseText = await response.text();
      const book = JSON.parse(responseText).data.book;
      props.onComplete(book);
    } else {
      setError(true);
      setHelperText(
        "An error occurred while adding the book. Please try again later"
      );
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError(false);
    setOpen(false);
  };

  const handleFormChange = (event) => {
    event.preventDefault();
    if (event.target.value.length === 10 || event.target.value.length === 13) {
      setIsbnNumber(event.target.value);
      setHelperText("Enter a 13 or 10 digit ISBN number");
      setError(false);
    } else {
      setHelperText("Please enter a valid ISBN number");
      setError(true);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add a book
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add Book
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleAddBook}
              disabled={error}
            >
              add
            </Button>
          </Toolbar>
        </AppBar>
        <Container component="main">
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="isbn"
              label="ISBN Number"
              helperText={helperText}
              error={error}
              name="isbn"
              autoFocus
              onChange={handleFormChange}
            />
          </form>
        </Container>
      </Dialog>
    </div>
  );
};

export default AddBook;

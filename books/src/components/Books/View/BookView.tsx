import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookProps } from "../../../@types";
import { useBookContext } from "../BookContextWrapper/BookContext";
import "../Style/books.css";

const BookView: React.FC<any> = () => {
  const [book, setBook] = useState<BookProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const { books } = useBookContext();
  const param: any = useParams();

  useEffect(() => {
    if (param.id) {
      setLoading(true);
      const bookIndex = books.findIndex(
        (el: BookProps) => el.id === Number(param.id)
      );
      setBook(books[bookIndex]);
      setLoading(false);
    }
  }, [param]);

  return (
    <React.Fragment>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment>
          <div className="bookview-container">
            <Grid container spacing={3} direction="row" justifyContent="center">
              <Paper elevation={3} sx={{ padding: 3, margin: 3 }}>
                <Typography variant="h4" gutterBottom>
                  {book?.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  Author: <strong>{book?.author}</strong>
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  Publication Year:{" "}
                  <strong>
                    {new Date(book?.publicationYear as string).getFullYear()}
                  </strong>
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  Genre: <strong>{book?.gener}</strong>
                </Typography>
              </Paper>
            </Grid>
          </div>
          <Box display="flex" justifyContent="flex-end" mr={10}>
            <Button href="/books" variant="contained">
              Back
            </Button>
          </Box>
        </React.Fragment>
      )}
      ;
    </React.Fragment>
  );
};

export default BookView;

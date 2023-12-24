import { Box } from "@mui/material";
import React, { lazy } from "react";
import "./Style/books.css";

const BooksListing = lazy(() => import("./List/BookListing"));
const CreateBtn = lazy(() => import("./List/CreateBtn"));

const Books = (): React.ReactElement => {
  return (
    <div className="books-container">
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <CreateBtn />
      </Box>
      <BooksListing />
    </div>
  );
};

export default Books;

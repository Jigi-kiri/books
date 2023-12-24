import { Logout } from "@mui/icons-material";
import { Box, Button, Tooltip } from "@mui/material";
import React, { lazy } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/books.css";

const BooksListing = lazy(() => import("./List/BookListing"));
const CreateBtn = lazy(() => import("./List/CreateBtn"));

const Books = (): React.ReactElement => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="row" justifyContent="flex-end" m={2}>
        <Tooltip title="Logout">
          <Button variant="outlined" onClick={handleLogout}>
            <Logout />
          </Button>
        </Tooltip>
      </Box>
      <div className="books-container">
        <Box display="flex" flexDirection="row" justifyContent="flex-end">
          <CreateBtn />
        </Box>
        <BooksListing />
      </div>
    </React.Fragment>
  );
};

export default Books;

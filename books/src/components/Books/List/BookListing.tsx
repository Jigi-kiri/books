import { BorderColor, Delete, Visibility } from "@mui/icons-material";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { red } from "@mui/material/colors";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import React, { lazy, useState } from "react";
import { BookProps } from "../../../@types";
import { InitialData } from "../../../initialBookData";
import { useBookContext } from "../BookContextWrapper/BookContext";
import "../Style/books.css";
const ConfirmationDialog = lazy(() => import("./ConfirmationDialog"));

const BookListing = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<BookProps>();

  const { books, removeBook } = useBookContext();

  const handleDelete = () => {
    if (!selectedBook?.id) return;
    removeBook(selectedBook?.id);
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      filterable: true,
      sortable: true,
      headerClassName: "custom-header",
    },
    {
      field: "author",
      headerName: "Author",
      filterable: true,
      sortable: true,
      headerClassName: "custom-header",
      flex: 1,
    },
    {
      field: "publicationYear",
      headerName: "Publication Year",
      filterable: true,
      sortable: true,
      headerClassName: "custom-header",
      flex: 1,
      renderCell: (params: GridCellParams) => {
        return (
          <div style={{ marginLeft: 30 }}>
            {new Date(params.value as string).getFullYear()}
          </div>
        );
      },
    },
    {
      field: "gener",
      headerName: "Gener",
      filterable: true,
      sortable: true,
      headerClassName: "custom-header",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      filterable: false,
      headerClassName: "custom-header",
      renderCell: (params: GridCellParams) => {
        return (
          <div>
            <ButtonGroup
              size="small"
              color="primary"
              variant="text"
              aria-label="trip action buttons"
            >
              <Tooltip title="Edit">
                <Button href={`/books/edit/${params.id}`}>
                  <BorderColor fontSize="small" />
                </Button>
              </Tooltip>
              <Tooltip title="View">
                <Button href={`/books/view/${params.id}`}>
                  <Visibility fontSize="small" />
                </Button>
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  onClick={() => {
                    setOpen(true);
                    setSelectedBook(params.row);
                  }}
                >
                  <Delete fontSize="small" style={{ color: red[400] }} />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </div>
        );
      },
      flex: 1,
    },
  ];

  return (
    <React.Fragment>
      <ConfirmationDialog
        open={open}
        onClose={() => setOpen(!open)}
        onOk={() => handleDelete()}
        dialogTitle={selectedBook?.title as string}
      />
      <DataGrid
        rows={books ?? InitialData}
        columns={columns}
        columnBuffer={2}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowId={(row: BookProps) => row.id}
        rowSelection={false}
        disableColumnSelector={false}
        disableDensitySelector={false}
        pageSizeOptions={[5, 10]}
      />
    </React.Fragment>
  );
};

export default BookListing;

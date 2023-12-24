import { BorderColor, Delete, Visibility } from "@mui/icons-material";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { red } from "@mui/material/colors";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import React, { lazy, useState } from "react";
import { BookProps } from "../../../@types";
import { useBookContext } from "../BookContextWrapper/BookContext";
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
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
    },
    {
      field: "publicationYear",
      headerName: "Publication Year",
      flex: 1,
    },
    {
      field: "gener",
      headerName: "Gener",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      filterable: false,
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
        rows={books}
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
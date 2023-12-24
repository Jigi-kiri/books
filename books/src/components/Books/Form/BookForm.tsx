import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { BookProps } from "../../../@types";
import { useBookContext } from "../BookContextWrapper/BookContext";
import "../Style/books.css";

const initialData: BookProps = {
  id: 0,
  title: "",
  author: "",
  publicationYear: "",
  gener: "",
};

interface BookFormProps {
  edit?: boolean;
  data?: BookProps;
}

const BookForm: React.FC<BookFormProps> = ({ edit = false }) => {
  const navigate = useNavigate();
  const [book, setBook] = useState<BookProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const { books, addBook, updateBook } = useBookContext();
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

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .max(20, "Max limit is 20 characters")
      .required("Title Required")
      .trim(),
    author: yup
      .string()
      .max(20, "Max limit is 20 characters")
      .required("Author Required")
      .trim(),
    gener: yup
      .string()
      .max(100, "Max limit 100 characters")
      .required("Gener Required")
      .trim(),
  });

  const onHandleSubmit = (data: BookProps) => {
    if (Object.keys(data).length > 0) {
      const bookIndex = books.findIndex(
        (el: BookProps) => el.title.toLowerCase() === data.title.toLowerCase()
      );
      if (bookIndex !== -1 && !edit)
        return alert("Book with this title already exist");
      if (edit) {
        updateBook(data);
      } else {
        addBook(data);
      }
      navigate("/books");
    }
  };

  const formik = useFormik({
    initialValues: edit ? book : (initialData as any),
    onSubmit: (values: BookProps) => onHandleSubmit(values),
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: true,
  });

  const { values, errors, handleSubmit, handleChange, handleBlur, touched } =
    formik;

  return loading ? (
    <Box display="flex" justifyContent="center" m={20}>
      <CircularProgress size={50} />
    </Box>
  ) : (
    <Box
      className="bookform-container"
      component="form"
      onSubmit={handleSubmit}
    >
      <Grid container spacing={3} direction="row" justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Title <span style={{ color: red[400] }}>*</span>
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={values?.title || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title && errors.title}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Author <span style={{ color: red[400] }}>*</span>
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            name="author"
            label="Author"
            value={values?.author || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.author && Boolean(errors.author)}
            helperText={touched.author && errors.author}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        mt={2}
      >
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Publication Year <span style={{ color: red[400] }}>*</span>
          </Typography>
          <div className="datepicker-field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={
                  values?.publicationYear
                    ? dayjs(values?.publicationYear)
                    : null
                }
                name="publicationYear"
                className="date-field"
                format="YYYY"
                onChange={(newValue: Dayjs | null) => {
                  handleChange({
                    target: {
                      name: "publicationYear",
                      value: newValue?.toString(),
                    },
                  });
                }}
                label="Publication Year"
                views={["year"]}
                disableFuture={true}
              />
            </LocalizationProvider>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">
            Gener <span style={{ color: red[400] }}>*</span>
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="gener"
            name="gener"
            label="Gener"
            value={values?.gener || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.gener && Boolean(errors.gener)}
            helperText={touched.gener && errors.gener}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" type="submit" style={{ marginRight: 20 }}>
          {edit ? "Update" : "Create"}
        </Button>
        <Button variant="outlined" href="/books">
          Cancle
        </Button>
      </Box>
    </Box>
  );
};

export default BookForm;

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { LoginCredProps } from "../../@types";
import "./login.css";

const initialData: LoginCredProps = {
  email: "",
  password: "",
};

interface LoginFormProps {
  lable: string;
  onHandleSubmit: (data: LoginCredProps) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ lable, onHandleSubmit }) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Email Invalid").required("Email Required"),
    password: yup
      .string()
      .min(8, "Min 8 character required")
      .max(20, "No more then 20 characters")
      .required("Password required"),
  });

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: (values: LoginCredProps) => onHandleSubmit(values),
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    formik;

  return (
    <React.Fragment>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="login-container" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {lable}
            </Typography>
            <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {lable.toUpperCase()}
              </Button>
              <Grid container>
                {lable === "Sign in" ? (
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Register"}
                    </Link>
                  </Grid>
                ) : (
                  <Grid item>
                    <Link href="/" variant="body2">
                      {"Already have an account? Sign Up"}
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LoginForm;

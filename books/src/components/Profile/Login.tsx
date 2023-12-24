import { Box, CircularProgress } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCredProps } from "../../@types";
import { auth } from "../../config";
import { InitialData } from "../../initialBookData";
import LoginForm from "./LoginForm";

const Login = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFormSubmit = (data: LoginCredProps) => {
    if (Object.keys(data).length === 0) return;
    setLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res: any) => {
        localStorage.setItem("token", res._tokenResponse.idToken);
        localStorage.setItem("books", JSON.stringify(InitialData));
        navigate("/books");
      })
      .catch((err: any) => {
        const errorCode = err.code.split("auth/")[1];
        if (errorCode) alert(errorCode);
      })
      .finally(() => setLoading(false));
  };

  return loading ? (
    <Box display="flex" justifyContent="center" m={20}>
      <CircularProgress size={50} />
    </Box>
  ) : (
    <LoginForm lable="Sign in" onHandleSubmit={onFormSubmit} />
  );
};

export default Login;

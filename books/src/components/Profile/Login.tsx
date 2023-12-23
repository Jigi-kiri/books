import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginCredProps } from "../../@types";
import { auth } from "../../config";
import LoginForm from "./LoginForm";

const Login = (): React.ReactElement => {
  const navigate = useNavigate();

  const onFormSubmit = (data: LoginCredProps) => {
    if (Object.keys(data).length === 0) return;
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res: any) => {
        localStorage.setItem("token", res._tokenResponse.idToken);
        navigate("/books");
      })
      .catch((err: any) => {
        const errorCode = err.code.split("auth/")[1];
        if (errorCode) alert(errorCode);
      });
  };

  return <LoginForm lable="Sign in" onHandleSubmit={onFormSubmit} />;
};

export default Login;

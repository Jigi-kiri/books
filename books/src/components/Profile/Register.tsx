import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginCredProps } from "../../@types";
import { auth } from "../../config";
import LoginForm from "./LoginForm";

const Register = (): React.ReactElement => {
  const navigate = useNavigate();

  const onFormSubmit = (data: LoginCredProps) => {
    if (Object.keys(data).length === 0) return;
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        navigate("/");
        alert("User Registered successfully, please login");
      })
      .catch((err) => {
        const errorCode = err.code.split("auth/")[1];
        if (errorCode) alert(errorCode);
      });
  };

  return <LoginForm lable="Register" onHandleSubmit={onFormSubmit} />;
};

export default Register;

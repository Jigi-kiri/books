import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./components/Profile/Login"));
const Register = lazy(() => import("./components/Profile/Register"));

function App() {
  const isLoggedIn: boolean = localStorage.getItem("token") ? true : false;

  if (!isLoggedIn && window.location.pathname !== "/") {
    window.location.href = "/";
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;

import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { BookProvider } from "./components/Books/BookContextWrapper/BookContext";

const Login = lazy(() => import("./components/Profile/Login"));
const Register = lazy(() => import("./components/Profile/Register"));
const Books = lazy(() => import("./components/Books/index"));

function App() {
  const isLoggedIn: boolean = localStorage.getItem("token") ? true : false;

  if (!isLoggedIn && window.location.pathname !== "/") {
    window.location.href = "/";
  }

  return (
    <div>
      <BookProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </BookProvider>
    </div>
  );
}

export default App;

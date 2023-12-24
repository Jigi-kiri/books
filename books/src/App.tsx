import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { BookProvider } from "./components/Books/BookContextWrapper/BookContext";

const Login = lazy(() => import("./components/Profile/Login"));
const Register = lazy(() => import("./components/Profile/Register"));
const Books = lazy(() => import("./components/Books/index"));
const BooksView = lazy(() => import("./components/Books/View/BookView"));
const BookForm = lazy(() => import("./components/Books/BookForm"));

function PrivateRoute({ children }: any) {
  const authorization = localStorage.getItem("token") as string;
  return authorization ? children : <Navigate to="/" />;
}

function App() {
  return (
    <div>
      <BookProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/create"
            element={
              <PrivateRoute>
                <BookForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/view/:id"
            element={
              <PrivateRoute>
                <BooksView />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/edit/:id"
            element={
              <PrivateRoute>
                <BookForm edit={true} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BookProvider>
    </div>
  );
}

export default App;

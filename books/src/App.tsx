import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./components/Profile/Login"));
const Register = lazy(() => import("./components/Profile/Register"));
const LoginForm = lazy(() => import("./components/Profile/LoginForm"));

function App() {
  const handleFormSubmit = () => {
    console.log("handle submit called");
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/loginform"
          element={
            <LoginForm lable="Login" onHandleSubmit={handleFormSubmit} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./Login";
import Admin from "./pages/admin/admin";
import User from "./pages/user/user";
import Teacher from "./pages/teacher/teacher";
import { AuthContext } from "./context/AuthContext";
import Cookies from "js-cookie";

function App() {
  const { user } = useContext(AuthContext);

  console.log("user=>", user);
  console.log("token=>", Cookies.get("token"));
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={"/user"} /> : <Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/user" element={user ? <User /> : <Navigate to={"/"} />} />
      <Route path="/teacher" element={<Teacher />} />
    </Routes>
  );
}

export default App;

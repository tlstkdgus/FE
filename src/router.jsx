import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Essential from "./pages/Essential";
import Exclude from "./pages/Exclude";
import MyPage from "./pages/MyPage";
import Retake from "./pages/Retake";
import SignUp from "./pages/SignUp";
import Setting from "./pages/Setting";
import SignUpComplete from "./pages/SignUpComplete";

const RouterComponent = () => (
  <Routes>
    <Route path="/" element={<Setting />} />
    <Route path="/main" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signup-complete" element={<SignUpComplete />} />
    <Route path="/create" element={<Create />} />
    <Route path="/essential" element={<Essential />} />
    <Route path="/exclude" element={<Exclude />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/retake" element={<Retake />} />
  </Routes>
);

export default RouterComponent;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Essential from "./pages/Essential";
import Exclude from "./pages/Exclude";
import MyPage from "./pages/MyPage";
import Retake from "./pages/Retake";
import SignUp from "./pages/SignUp";
import Setting from "./pages/Setting";
import Create from "./pages/Create";
import Day from "./pages/Day";
import Credit from "./pages/Credit";
import Combination from "./pages/Combination";
import Result from "./pages/Result";
import DetailedCredit from "./pages/DetailedCredit";
const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Setting />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/essential" element={<Essential />} />
      <Route path="/exclude" element={<Exclude />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/retake" element={<Retake />} />
      <Route path="/create" element={<Create />} />
      <Route path="/day" element={<Day />} />
      <Route path="/credit" element={<Credit />} />
      <Route path="/combination" element={<Combination />} />
      <Route path="/detailedcredit" element={<DetailedCredit />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default RouterComponent;

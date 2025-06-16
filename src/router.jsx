import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Essential from "./pages/Essential";
import Exclude from "./pages/Exclude";
import MyPage from "./pages/MyPage";
import Retake from "./pages/Retake";
import SignUp from "./pages/SignUp";
import Setting from "./pages/Setting";
import SignUpComplete from "./pages/SignUpComplete";
import Credits from "./pages/Credits";
import EditProfile from "./pages/EditProfile";
import Create from "./pages/Create";
import Day from "./pages/Day";
import Credit from "./pages/Credit";
import Combination from "./pages/Combination";
import Result from "./pages/Result";
const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/main" element={<Main />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup-complete" element={<SignUpComplete />} />
      <Route path="/essential" element={<Essential />} />
      <Route path="/exclude" element={<Exclude />} />{" "}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/retake" element={<Retake />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/create" element={<Create />} />
      <Route path="/day" element={<Day />} />
      <Route path="/credit" element={<Credit />} />
      <Route path="/combination" element={<Combination />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default RouterComponent;

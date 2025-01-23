import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
//import apiInstance from "./utils/useAxios";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import ForgotPassword from "./views/Auth/ForgotPassword";
import CreateNewPassword from "./views/Auth/CreateNewPassword";


function App() {

  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />}/>
          <Route path="/forgot-password/" element={<ForgotPassword />}/>
          <Route path="/password-reset/" element={<CreateNewPassword />}/>

        </Routes>
      </MainWrapper>
    </BrowserRouter>
  )
}

export default App

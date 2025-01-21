import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainWrapper from "./layouts/MainWrapper";
//import apiInstance from "./utils/useAxios";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";


function App() {

  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />}/>
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  )
}

export default App

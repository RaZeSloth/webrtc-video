import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RuumiNupp from "./routes/RuumiNupp";
import Ruum from "./routes/Ruum";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/room/:roomID" element={<Ruum/>} />
      <Route path="/" element={<RuumiNupp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

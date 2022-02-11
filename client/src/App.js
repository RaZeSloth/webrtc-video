import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/room/:roomID" element={<Room/>} />
      <Route path="/" element={<CreateRoom/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

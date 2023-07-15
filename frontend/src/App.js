import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './paginas/home';
import Dashboard from './paginas/dashboard';


function App() {
  return (
    


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>    



  );
}

export default App;

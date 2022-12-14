import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import User from './pages/User';
import Login from './pages/Login';
import Post from './pages/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/post" element={ < Post />}/>
        <Route path="/login" element={ < Login />}/>
        <Route path="/" element={ < User />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

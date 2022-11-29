import React from 'react';
//import FileUpload from './components/FileUpload';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Schedule from './pages/Schedule';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => (
    <Router>
      <Navbar/>
        <Routes>
          <Route path = '/' exact element = {<Home/>}/>
          <Route path = '/upload' exact element = {<Upload/>}/>
          <Route path = '/schedule' exact element = {<Schedule/>}/>
        </Routes>

    </Router>
);

export default App;

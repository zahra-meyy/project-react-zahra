// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import GuruData from './Pages/GuruData';
import SiswaData from './Pages/SiswaData';
import TambahGuru from './Pages/TambahGuru';
import TambahSiswa from './Pages/TambahSiswa';
import UpdateGuru from './Pages/UpdateGuru';
import UpdateSiswa from './Pages/UpdateSiswa';
import './App.css';
import './animations.css'; // Assuming animations.css is in the same directory as your App.js



function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/guru" element={<GuruData />} />
            <Route path="/siswa" element={<SiswaData />} />
            <Route path="/TambahGuru" element={<TambahGuru/>} />
            <Route path="/TambahSiswa" element={<TambahSiswa/>} />
            <Route path="/UpdateGuru/:id" element={<UpdateGuru />} />
            <Route path="/UpdateSiswa/:id" element={<UpdateSiswa />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

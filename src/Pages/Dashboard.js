import React from 'react';
import '../Css/Dashboard.css';
import { FaUsers, FaChalkboardTeacher, FaClipboardList, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Fungsi untuk menavigasi ke halaman lain saat card diklik
  const goToPage = (page) => {
    navigate(page);
  };

  return (
    <div className="dashboard">
      <h2>Selamat datang di Dashboard Zahra!</h2>
      <div className="add-button-container">
        <button className="add-button" onClick={() => navigate('/add')}>
          <FaPlus size={20} />
          Tambah
        </button>
      </div>
      <div className="cards-container">
        <div className="card" onClick={() => goToPage('/dashboard')}>
          <div className="card-header">
            <FaClipboardList size={30} className="card-icon" />
            <h3>Dashboard</h3>
          </div>
          <div className="card-body">
            <p>Overview sistem dan data.</p>
          </div>
        </div>
        <div className="card" onClick={() => goToPage('/guru')}>
          <div className="card-header">
            <FaChalkboardTeacher size={30} className="card-icon" />
            <h3>Data Guru</h3>
          </div>
          <div className="card-body">
            <p>Manajemen data guru sekolah.</p>
          </div>
        </div>
        <div className="card" onClick={() => goToPage('/siswa')}>
          <div className="card-header">
            <FaUsers size={30} className="card-icon" />
            <h3>Data Siswa</h3>
          </div>
          <div className="card-body">
            <p>Manajemen data siswa sekolah.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa'; // Adding icons from react-icons
import '../Css/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for toggling sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      {/* Sidebar toggle button for small screens */}
      <div className="sidebar-toggle">
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar content */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>SEMUT IMUT</h3>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/" className="sidebar-link" onClick={() => setIsOpen(false)}>
                <FaHome className="sidebar-icon" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/guru" className="sidebar-link" onClick={() => setIsOpen(false)}>
                <FaUserAlt className="sidebar-icon" /> Data Guru
              </Link>
            </li>
            <li>
              <Link to="/siswa" className="sidebar-link" onClick={() => setIsOpen(false)}>
                <FaUsers className="sidebar-icon" /> Data Siswa
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

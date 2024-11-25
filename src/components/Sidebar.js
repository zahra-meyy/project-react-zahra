import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa'; // Adding icons from react-icons
import '../Css/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar toggle button for small screens */}
      <div className="sidebar-toggle">
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>SEMUT IMUT</h2>
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

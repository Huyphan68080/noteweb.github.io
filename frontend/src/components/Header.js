import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut, FiUser, FiTrash2, FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';
import './Header.css';

export default function Header({ admin, onLogout }) {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-content">
        <motion.div
          className="header-brand"
          whileHover={{ scale: 1.05 }}
        >
          <h1>📝 Note App</h1>
        </motion.div>

        <div className="header-user">
          <div className="user-info">
            <FiUser className="user-icon" />
            <span>{admin?.username}</span>
          </div>

          <motion.button
            className="trash-btn"
            onClick={() => navigate('/trash')}
            title="Thùng rác"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiTrash2 />
          </motion.button>

          <motion.button
            className="theme-btn"
            onClick={toggleTheme}
            title={isDarkMode ? 'Sáng' : 'Tối'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </motion.button>

          <motion.button
            className="logout-btn"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiLogOut /> Logout
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

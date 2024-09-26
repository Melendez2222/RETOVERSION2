// src/components/Common/header/AdminSubMenu.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { removeToken } from '../../../utils/localStorage';

interface AdminSubMenuProps {
  onClose: () => void;
}

const AdminSubMenu: React.FC<AdminSubMenuProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/');
    onClose();
  };

  const handleAdminPanel = () => {
    navigate('/AdmPanel');
    onClose();
  };

  return (
    <div className="admin-submenu">
      <button onClick={handleAdminPanel}>Panel Administrador</button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default AdminSubMenu;

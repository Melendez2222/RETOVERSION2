// src/components/Common/header/AdminSubMenu.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { clearStorage, removeToken } from '../../../utils/localStorage';
import { useAuth } from '../../../auth/AuthProv';

interface AdminSubMenuProps {
  onClose: () => void;
}

const AdminSubMenu: React.FC<AdminSubMenuProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
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

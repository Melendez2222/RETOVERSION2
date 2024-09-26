import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir si no hay token
import ProductCrud from './ProductCrud';
import SubMenuAdm from './SubMenuAdm';
import './Home.css';
import ClienteCrud from './ClienteCrud';
import Factura from './Factura';
//import { useAuth } from '../../auth/AuthProv';
import { getToken } from '../../utils/localStorage';

const AdmPanel = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const navigate = useNavigate(); 
  useEffect(() => {
    const token = getToken();
    // console.log("aasdad", token)
    if (!token) {
      navigate('/');
    }
  }, [navigate]); 

  const renderCategoryComponent = () => {
    switch (selectedMenu) {
      case 'Productos':
        return <ProductCrud />;
      case 'Clientes':
        return <ClienteCrud />;
      case 'Facturas':
        return <Factura />;
      default:
        return null; 
    }
  }

  return (
    <section className='home'>
      <div className='container d_flex'>
        <SubMenuAdm onSelectMenu={setSelectedMenu} />
        {renderCategoryComponent()}
      </div>
    </section>
  );
}

export default AdmPanel;

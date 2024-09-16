import React from 'react'
import { useState } from 'react';
import ProductCrud from './ProductCrud';
import SubMenuAdm from './SubMenuAdm';
import './Home.css';
import ClienteCrud from './ClienteCrud';
import Factura from './Factura';

const AdmPanel = () => {

  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const renderCategoryComponent = () => {
    switch (selectedMenu) {
      case 'Productos':
        return <ProductCrud />;
      case 'Clientes':
        return <ClienteCrud />;
      case 'Facturas':
        return <Factura />;
    }
  }
  return (
    <section className='home'>
      <div className='container d_flex'>
        <SubMenuAdm onSelectMenu={setSelectedMenu} />
        {renderCategoryComponent()}
      </div>
    </section>
  )
}

export default AdmPanel
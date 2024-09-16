import React from 'react'
import { useState } from 'react';
import { SubMenuAdmProps } from './Interfaces';

const SubMenuAdm: React.FC<SubMenuAdmProps> = ({ onSelectMenu }) => {
    const [showCatalogosSubmenu, setShowCatalogosSubmenu] = useState(false);
    const [showDocumentosSubmenu, setShowDocumentosSubmenu] = useState(false);
    

    const toggleCatalogosSubmenu = () => {
        setShowCatalogosSubmenu(!showCatalogosSubmenu);
    };

    const toggleDocumentosSubmenu = () => {
        setShowDocumentosSubmenu(!showDocumentosSubmenu);
    };
    return (
        <>
            <div className='category'>
                <div className="box f_flex" onClick={toggleCatalogosSubmenu}>
                    <img src="./src/assets/submenu/catalogar.png" alt="" />
                    <span>CATALOGOS</span>
                </div>
                {showCatalogosSubmenu && (
                    <div className="submenu">
                        <div className="box f_flex" onClick={() => onSelectMenu("Productos")}>
                        <img src="./src/assets/submenu/productt.png" alt="" />
                            <span>Productos</span>
                        </div>
                        <div className="box f_flex" onClick={() => onSelectMenu("Clientes")}>
                        <img src="./src/assets/submenu/cliente.png" alt="" />
                            <span>Clientes</span>
                        </div>
                    </div>
                )}
                <div className="box f_flex" onClick={toggleDocumentosSubmenu}>
                    <img src="./src/assets/submenu/docs.png" alt="" />
                    <span>Documentos</span>
                </div>
                {showDocumentosSubmenu && (
                    <div className="submenu">
                    <div className="box f_flex" onClick={() => onSelectMenu("Facturas")}>
                        <img src="./src/assets/submenu/factura.png" alt="" />
                        <span>Facturas</span>
                    </div>
                    </div>
                )}
            </div>

        </>
    )
}

export default SubMenuAdm
import { useEffect, useState } from 'react'
import { Client } from './Interfaces';
import { ListClient } from '../../services/Request';
import { Box, Button } from '@mui/material';
import ClientModal from './Clients/ClientModal';
import { useAuth } from '../../auth/AuthProv';

const ClienteCrud = () => {
  const {token}=useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = (client: Client | null = null) => {
    setSelectedClient(client);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelectedClient(null);
    setShowModal(false);
  };
  const handleSave = () => {
    fetchClients();
    handleCloseModal();
  };
  const fetchClients = async () => {
    try {
      const response = await ListClient(token);
      setClients(response);
    } catch (error) {
      alert('Error fetching products:');
      console.log(error);
    }
  };
  useEffect(() => {
    fetchClients();
  }, []);
  return (
    <>
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100px"
        >
          <Button onClick={() => handleOpenModal(null)} variant="contained" color="primary">
            Agregar Cliente
          </Button>
        </Box>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">RUC/DNI</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">DIRECCION</th>
              <th scope="col">CORREO</th>
              <th scope="col">TELEFONO</th>
              <th scope="col">ESTADO</th>
              <th scope="col">ROL</th>
              <th scope="col">FECHA DE CREACION</th>
              <th scope="col">ACCION</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client.userId}>
                <th scope="row">{index + 1}</th>
                <td>{client.userRucDni}</td>
                <td>{client.roleName}</td>
                <td>{client.userAddress}</td>
                <td>{client.userEmail}</td>
                <td>{client.userPhone}</td>
                <td>{client.roleName}</td>
                <td>{client.userActive === true ? 'Activo' : 'Inactivo'}</td>
                <td>{client.createdAt}</td>
                <td>
                  <button type="button" className="btn btn-success" onClick={() => handleOpenModal(client)}>
                    EDITAR
                  </button>
                  <button type="button" className="btn btn-danger" >
                    ELIMINAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ClientModal open={showModal} onClose={handleCloseModal} onSave={handleSave} client={selectedClient}/>
    </>
  )
}

export default ClienteCrud
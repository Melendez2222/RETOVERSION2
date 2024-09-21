import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Client, ClientModalProps } from '../Interfaces'
import { CreateClient, UpdateClient } from '../../../services/Request'
import { useNavigate } from 'react-router-dom'

const ClientModal: React.FC<ClientModalProps> = ({ open, onClose, onSave, client }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const navigate=useNavigate();
    const [formData, setFormData] = useState<Client>({
        userId: 0,
                userRucDni: '',
                userName: '',
                userAddress: '',
                userEmail: '',
                userPhone:0,
                roleName:'',
                userUsuario:'',
                userPassword:'',
                userActive: undefined,
                createdAt: ''
    });
    useEffect(() => {
        if (client) {
            setFormData(client);
        } else {
            setFormData({
                userId: 0,
                userRucDni: '',
                userName: '',
                userAddress: '',
                userEmail: '',
                userPhone:0,
                roleName:'',
                userUsuario:'',
                userPassword:'',
                userActive: undefined,
                createdAt: ''
            });
        }
    }, [client]);
    const handleSubmit = async () => {
        let response;
        try {
            if (client) {
                response = await UpdateClient(formData);
            } else {
                response = await CreateClient(formData);
            }
            if (response === 200) {
                setAlertOpen(true); // Muestra la alerta de éxito
            }
            onSave();
            onClose(); // Cierra el modal después de la operación

        } catch (error) {
            console.error('Error:', error);
            navigate("/");
        }
    };
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Agregar Cliente</DialogTitle>
                <DialogContent>
                    <TextField
                        label="RUC O DNI"
                        id='rucdni'
                        value={client?.userRucDni}
                        onChange={(e) => setFormData({ ...formData, userRucDni: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Nombre o Razon social"
                        id='nombre'
                        value={client?.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Direccion"
                        id='direccion'
                        value={client?.userAddress}
                        onChange={(e) => setFormData({ ...formData, userAddress: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Correo"
                        id='correo'
                        type="email"
                        value={client?.userEmail}
                        onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Correo"
                        id='correo'
                        type="email"
                        value={client?.userPhone}
                        onChange={(e) => setFormData({ ...formData, userPhone: Number(e.target.value) })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Correo"
                        id='correo'
                        type="email"
                        value={client?.roleName}
                        onChange={(e) => setFormData({ ...formData, roleName: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Usuario"
                        id='usuario'
                        value={formData.userUsuario}
                        onChange={(e) => setFormData({ ...formData, userUsuario: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Contraseña"
                        id='contraseña'
                        value={formData.userPassword}
                        onChange={(e) => setFormData({ ...formData, userPassword: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Select
                        label="Estado"
                        id="estado"
                        value={formData.userActive !== undefined ? (formData.userActive ? 'Activo' : 'Inactivo') : 'Seleccione un estado'}
                        onChange={(e) => setFormData({ ...formData, userActive: e.target.value === 'Activo' })}
                        fullWidth
                    >
                        <MenuItem value="Seleccione un estado" disabled>
                            Seleccione un estado
                        </MenuItem>
                        <MenuItem value="Activo">Activo</MenuItem>
                        <MenuItem value="Inactivo">Inactivo</MenuItem>
                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>CANCELAR</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        GUARDAR
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Operación exitosa!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ClientModal
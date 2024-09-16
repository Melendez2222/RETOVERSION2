import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Client, ClientModalProps } from '../Interfaces'
import { CreateClient, UpdateClient } from '../../../services/Request'

const ClientModal: React.FC<ClientModalProps> = ({ open, onClose, onSave, client }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [formData, setFormData] = useState<Client>({
        iD_CLIENTE: 0,
        rucdni: '',
        nombre: '',
        direccion: '',
        correo: '',
        usuario: '',
        contraseña: '',
        activo: undefined,
        fecha_Creacion: ''
    });
    useEffect(() => {
        if (client) {
            setFormData(client);
        } else {
            setFormData({
                iD_CLIENTE: 0,
                rucdni: '',
                nombre: '',
                direccion: '',
                correo: '',
                usuario: '',
                contraseña: '',
                activo: undefined,
                fecha_Creacion: ''
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
                        value={client?.rucdni}
                        onChange={(e) => setFormData({ ...formData, rucdni: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Nombre o Razon social"
                        id='nombre'
                        value={client?.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Direccion"
                        id='direccion'
                        value={client?.direccion}
                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Correo"
                        id='correo'
                        type="email"
                        value={client?.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Usuario"
                        id='usuario'
                        value={formData.usuario}
                        onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Contraseña"
                        id='contraseña'
                        value={formData.contraseña}
                        onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Select
                        label="Estado"
                        id="estado"
                        value={formData.activo !== undefined ? (formData.activo ? 'Activo' : 'Inactivo') : 'Seleccione un estado'}
                        onChange={(e) => setFormData({ ...formData, activo: e.target.value === 'Activo' })}
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
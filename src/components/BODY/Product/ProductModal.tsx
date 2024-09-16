import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Product, ProductModalProps } from '../Interfaces'
import { CreateProduct, UpdateProduct } from '../../../services/Request';

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, onSave, product }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [formData, setFormData] = useState<Product>({
        iD_PRODUCTO: 0,
        nombre: '',
        codigo: '',
        precio: 0.00,
        stock: 0,
        activo: undefined,
        categoria_pro_id: 0,
        fecha_Creacion: ''
    });
    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({
                iD_PRODUCTO: 0,
                nombre: '',
                codigo: '',
                precio: 0.00,
                stock: 0,
                activo: undefined,
                categoria_pro_id: 0,
                fecha_Creacion: ''
            });
        }
    }, [product]);
    const handleSubmit = async () => {
        let response;
        try {
            if (product) {
                response = await UpdateProduct(formData);
            } else {
                response = await CreateProduct(formData);
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
                <DialogTitle>Agregar Producto</DialogTitle>
                <DialogContent>
                    <TextField
                        label="CODIGO"
                        id='codigo'
                        value={formData.codigo}
                        onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="NOMBRE"
                        id='nombre'
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="CATEGORIA"
                        id='categoria_pro_id'
                        value={formData.categoria_pro_id}
                        onChange={(e) => setFormData({ ...formData, categoria_pro_id: parseFloat(e.target.value) || 0 })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="PRECIO"
                        id='precio'
                        type="text"
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) || 0.00 })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="STOCK"
                        id='stock'
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: parseFloat(e.target.value) || 0.00 })}
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

export default ProductModal
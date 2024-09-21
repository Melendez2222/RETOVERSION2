import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Category, Product, ProductModalProps } from '../Interfaces'
import { CreateProduct, ListCategory, UpdateProduct } from '../../../services/Request';

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, onSave, product }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [categorias, setCategorias] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>('');
    const [formData, setFormData] = useState<Product>({
        id_Product: 0,
        productName: '',
        productCode: '',
        price: 0,
        stock: 0,
        productActive: undefined,
        category: '',
        createdAt: '',
    });
    const fetchCategory = async () => {
        try {
            const response = await ListCategory();
            setCategorias(response);
        } catch (error) {
            alert('Error fetching products:');
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchCategory();
    },[]);
    useEffect(() => {
        
        if (product) {
            setFormData(product);
            const preselectedCategory = categorias.find(cat => cat.catProductName === product.category);
            if (preselectedCategory) {
                setSelectedCategoryId(preselectedCategory.catProductId);
                console.log('ID de la categoría preseleccionada:', preselectedCategory.catProductId);
            }
        } else {
            setFormData({
                id_Product: 0,
                productName: '',
                productCode: '',
                price: 0,
                stock: 0,
                productActive: undefined,
                category: '',
                createdAt: '',
            });
        }
    }, [product, categorias]);
    const handleSubmit = async () => {
        let response;
        try {
            if (product) {
                // response = await UpdateProduct(formData);
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
    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        const selectedCategoryname = event.target.value;
        // console.log('cat selected:', selectedCategoryname);
        const selectedCategoryid = categorias.find(cat => cat.catProductName == selectedCategoryname);
        // console.log('id selected:', (categorias.find(cat => cat.catProductName == selectedCategoryname)));
        if (selectedCategoryid) {
            
          setSelectedCategoryId(selectedCategoryid.catProductId);
          
          setFormData({ ...formData, category: selectedCategoryid.catProductName });
          console.log('ID de la categoría seleccionada:', selectedCategoryId);
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
                        value={formData.productCode}
                        onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="NOMBRE"
                        id='nombre'
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Select
                        labelId="category-select-label"
                        id='categoria_pro_id'
                        value={formData.category}
                        onChange={handleCategoryChange}
                        fullWidth
                    >
                        {categorias.map((category) => (
                            <MenuItem key={category.catProductId} value={category.catProductName}>
                                {category.catProductName}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        label="PRECIO"
                        id='precio'
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0.00 })}
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
                        value={formData.productActive !== undefined ? (formData.productActive ? 'Activo' : 'Inactivo') : 'Seleccione un estado'}
                        onChange={(e) => setFormData({ ...formData, productActive: e.target.value === 'Activo' })}
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
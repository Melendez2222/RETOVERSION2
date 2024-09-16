import { Add, Delete, Remove } from '@mui/icons-material'
import { Alert, Box, Button, Container, IconButton, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Client, ClienteSeleccionado, Detalle_Factura, FacturaI, Facturs, Product } from './Interfaces';
import { CreateDetalleFactura, CreateFactura, LastFactureid, listAllProducts, ListClient } from '../../services/Request';
import ClientModal from './Clients/ClientModal';

const Factura = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteSeleccionado | {}>({});
  const [producto, setProducto] = useState<Product[]>([]);
  const [clientes, setClientes] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [facture, setFacture] = useState<Facturs>({
    idFactura: 0,
    numeroFactura: '',
    idCliente: '',
    subtotal: 0,
    porcentajeIGV: 18,
    igv: 0,
    total: 0,
    items: [] // Array de items de la factura
  });

  const fetchClients = async () => {
    try {
      const response = await ListClient();
      setClientes(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleCloseModal = () => {
    setSelectedClient(null);
    setShowModal(false);
  };
  const handleSave = () => {
    fetchClients();
    handleCloseModal();
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listAllProducts();
        setProducto(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    const fetchFactureid = async () => {
      try {
        const response = await LastFactureid();
        facture.idFactura = response.ultimaFacturaId;
        facture.numeroFactura = response.ultimoCodFact;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchFactureid();
    fetchProducts();
    fetchClients();
  }, []);
  const handleAddItem = () => {
    setFacture({
      ...facture,
      items: [...facture.items, { id: facture.items.length + 1, producto: '', cantidad: 1, precio: 0, subtotal: 0 }],
    });
  };
  const handleProductoChange = (index: number, value: number) => {
    const productoSeleccionado = producto.find((p) => p.iD_PRODUCTO === value);
    if (!productoSeleccionado) return; // Asegura de que el producto exista

    // Crear una copia de los items actualizando el producto seleccionado
    const updatedItems = [...facture.items];
    updatedItems[index] = {
      ...updatedItems[index],
      producto: productoSeleccionado.nombre,
      precio: productoSeleccionado.precio,
      subtotal: updatedItems[index].cantidad * productoSeleccionado.precio,
    };

    // Calcular subtotal y convertir a número para evitar problemas de concatenación
    const subtotallist = Number(calcularSubtotal(updatedItems));
    const igvv = subtotallist * (facture.porcentajeIGV / 100);
    const totals = subtotallist + igvv;

    // Actualizar el estado de la factura asegurando que los valores sean numéricos
    setFacture({
      ...facture,
      items: updatedItems,
      subtotal: Number(subtotallist.toFixed(2)), // Convertir a string solo para la presentación
      igv: Number(igvv.toFixed(2)),
      total: Number(totals.toFixed(2)), // Convertir a string solo para la presentación
    });
  };
  const handleCantidadChange = (index: number, increment: number) => {
    const updatedItems = [...facture.items];
    updatedItems[index].cantidad += increment;
    if (updatedItems[index].cantidad < 1) updatedItems[index].cantidad = 1;
    updatedItems[index].subtotal = updatedItems[index].cantidad * updatedItems[index].precio;
    const subtotallist = Number(calcularSubtotal(updatedItems));
    const igvv = subtotallist * (facture.porcentajeIGV / 100);
    const totals = subtotallist + igvv;
    setFacture({
      ...facture, items: updatedItems, subtotal: subtotallist, igv: Number(igvv.toFixed(2)),
      total: Number(totals.toFixed(2)),
    });
  };
  const handleClienteChange = (e: { target: { value: any; }; }) => {
    const idCliente = e.target.value;
    setFacture((prevFacture) => ({
      ...prevFacture,
      idCliente
    }));

    const cliente = clientes.find((c) => c.iD_CLIENTE === idCliente);
    setClienteSeleccionado(cliente || {});
  };
  const handleEliminarItem = (index: number) => {
    const updatedItems = facture.items.filter((_, i) => i !== index);
    const subtotallist = Number(calcularSubtotal(updatedItems));
    const igvv = subtotallist * (facture.porcentajeIGV / 100);
    const totals = subtotallist + igvv;
    setFacture({ ...facture, items: updatedItems, subtotal: subtotallist, igv: Number(igvv.toFixed(2)), total: Number(totals.toFixed(2)), });
  };
  const calcularSubtotal = (items: any[]) => {
    return items.reduce((total: any, item: { subtotal: any; }) => total + item.subtotal, 0).toFixed(2);
  };
  const handleCreateFactura = async () => {
    let response;
    const factura: FacturaI = {
      cliente_id: selectedClient?.iD_CLIENTE || 0,
      personal_id: 1,
      subtotal: facture.subtotal,
      porcentaje_IGV: facture.porcentajeIGV
    };
    try {
      response = await CreateFactura(factura);
    } catch (error) {
      console.error('Error:', error);
    }
    if (response === 200) {
      for (const item of facture.items) {
        const productSeleccionado = producto.find((p) => p.nombre === item.producto);
        const detallefactura: Detalle_Factura = {
          factura_id: facture.idFactura,
          producto_id: productSeleccionado?.iD_PRODUCTO || 0,
          cantidad: item.cantidad,
        };
        response = await CreateDetalleFactura(detallefactura);
        
      }
      if (response === 200) {
        setAlertOpen(true);
      }
    }
  }
  return (
    <>
      <Container>
        <h1>Emisión de Facturas</h1>
        <form>
          <TextField
            label="IdFactura"
            value={facture.idFactura}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Número de Factura"
            value={facture.numeroFactura}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />

          <Select
            label="Cliente"
            value={facture.idCliente}
            onChange={handleClienteChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">
              <em>Seleccione un cliente</em>
            </MenuItem>
            {clientes.map((cliente) => (
              <MenuItem key={cliente.iD_CLIENTE} value={cliente.iD_CLIENTE}>
                {cliente.nombre}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField id="outlined-basic" label="RUC O DNI" value={(clienteSeleccionado as ClienteSeleccionado).rucdni || ''} variant="outlined" margin="normal" InputProps={{ readOnly: true }} sx={{ input: { color: 'black' } }} />
            <TextField id="outlined-basic" label="RAZON SOCIAL O NOMBRE" value={(clienteSeleccionado as ClienteSeleccionado).nombre || ''} variant="outlined" margin="normal" InputProps={{ readOnly: true }} sx={{ input: { color: 'black' } }} />
            <TextField id="outlined-basic" label="CORREO" value={(clienteSeleccionado as ClienteSeleccionado).correo || ''} variant="outlined" margin="normal" InputProps={{ readOnly: true }} sx={{ input: { color: 'black' } }} />
          </Box>
          <Button variant="contained" color="primary" onClick={() => setShowModal(true)} sx={{ margin: '16px' }}>
            Agregar Cliente
          </Button>
          <Button variant="contained" color="secondary" onClick={handleAddItem} className="mt-2">
            Agregar Producto
          </Button>

          {/* Tabla de detalles de factura */}
          <TableContainer component={Paper} className="mt-4">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facture.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Select
                        value={producto.find((p) => p.nombre === item.producto)?.iD_PRODUCTO || ''}
                        onChange={(e) => handleProductoChange(index, Number(e.target.value))}
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>Seleccione un producto</em>
                        </MenuItem>
                        {producto.map((producto) => (
                          <MenuItem key={producto.iD_PRODUCTO} value={producto.iD_PRODUCTO}>
                            {producto.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleCantidadChange(index, -1)}>
                        <Remove />
                      </IconButton>
                      {item.cantidad}
                      <IconButton onClick={() => handleCantidadChange(index, 1)}>
                        <Add />
                      </IconButton>
                    </TableCell>
                    <TableCell>{item.precio.toFixed(2)}</TableCell>
                    <TableCell>{item.subtotal.toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleEliminarItem(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Totales */}
          <TextField
            label="Subtotal"
            type="number"
            id='subtotalfactura'
            value={facture.subtotal}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Porcentaje de IGV"
            id='igvpercent'
            value={facture.porcentajeIGV}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="IGV"
            id='igvfactura'
            value={facture.igv}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total"
            id='totalfactura'
            value={facture.total}
            InputProps={{ readOnly: true }}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleCreateFactura} variant="contained" color="primary" fullWidth sx={{ margin: '16px' }}>
            Crear Factura
          </Button>
        </form>
      </Container>
      <ClientModal open={showModal} onClose={handleCloseModal} onSave={handleSave} client={selectedClient} />
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={() => setAlertOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '100%' }}>
          Operación exitosa!
        </Alert>
      </Snackbar>
    </>
  )
}

export default Factura
import { useEffect, useState } from "react";
import { listAllProducts } from "../../services/Request";
import { Product } from "./Interfaces";
import { Button, Box } from "@mui/material";
import ProductModal from "./Product/ProductModal";

const ProductCrud = () => {
  const [productItems, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const fetchProducts = async () => {
    try {
      const response = await listAllProducts();
      setProducts(response);
    } catch (error) {
      alert('Error fetching products:');
      console.log(error);
    }
  };
  const handleOpenModal = (product: Product | null = null) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };
  const handleSave = () => {
    fetchProducts();
    handleCloseModal();
  };
  useEffect(() => {
    fetchProducts();
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
            Agregar Producto
          </Button>
        </Box>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">CODIGO</th>
              <th scope="col">PRODUCTO</th>
              <th scope="col">CATEGORIA</th>
              <th scope="col">PRECIO</th>
              <th scope="col">STOCK</th>
              <th scope="col">ESTADO</th>
              <th scope="col">FECHA DE CREACION</th>
              <th scope="col">IMAGEN</th>
              <th scope="col">ACCION</th>
            </tr>
          </thead>
          <tbody>
            {productItems.map((product, index) => (
              <tr key={product.id_Product}>
                <th scope="row">{index + 1}</th>
                <td>{product.productCode}</td>
                <td>{product.productName}</td>
                <td>{product.catProductId}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.productActive === true ? 'Activo' : 'Inactivo'}</td>
                <td>{product.createdAt}</td>
                <td>
                  <img
                    src={`./src/assets/product/${product.productCode}.jpg`}
                    alt={product.productName}
                    style={{ width: '100px', height: '100px' }}
                  />
                </td>
                <td>
                  <button type="button" className="btn btn-success" onClick={() => handleOpenModal(product)}>
                    EDITAR
                  </button>
                  <button type="button" className="btn btn-danger">
                    ELIMINAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProductModal open={showModal} onClose={handleCloseModal} onSave={handleSave} product={selectedProduct}/>
    </>
  )
}

export default ProductCrud
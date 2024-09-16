import { useEffect, useState } from "react";
import AseoPersonal from './AseoPersonal';
import Calzado from './Calzado';
import Camisa from './Camisa';
import Categoria from './Categoria';
import Limpieza from './Limpieza';
import Pantalon from './Pantalon';
import { Product,HomeProps  } from "./Interfaces";
import {listAllProducts} from "./../../services/Request"
import './Home.css';

const Home:React.FC<HomeProps> = ({addToCart}) => {
  const [productItems, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);


  const handleSelectCategory = (category: string, index: number) => {
    setSelectedCategory(category);
    setSelectedIndex(index);
  };
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listAllProducts();
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const renderCategoryComponent = () => {
    const validIndex = selectedIndex !== null ? selectedIndex : 0;
    const categoryComponents: { [key: string]: JSX.Element } = {
      'CAMISA': <Camisa selectedIndex={validIndex} products={productItems} addToCart={addToCart}/>,
      'PANTALON': <Pantalon selectedIndex={validIndex} products={productItems} addToCart={addToCart}/>,
      'CALZADO': <Calzado selectedIndex={validIndex} products={productItems} addToCart={addToCart}/>,
      'ASEO PERSONAL': <AseoPersonal selectedIndex={validIndex} products={productItems} addToCart={addToCart}/>,
      'LIMPIEZA': <Limpieza selectedIndex={validIndex} products={productItems} addToCart={addToCart}/>,
    };
    return categoryComponents[selectedCategory] || (
      <div className="container-items">
        {productItems.map((product) => (
          <div className="item" key={product.iD_PRODUCTO}>
            <figure>
              <img src={`./src/assets/product/${product.codigo}.jpg`} alt={product.nombre} />
            </figure>
            <div className="info-product">
              <h2>{product.nombre}</h2>
              <div className='rate'>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
              </div>
              <p className="price">${product.precio}</p>
              <button onClick={() => addToCart(product)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className='home'>
      <div className='container d_flex'>
        <Categoria onSelectCategory={handleSelectCategory} />
        {renderCategoryComponent()}
      </div>
    </section>
  );
};

export default Home;

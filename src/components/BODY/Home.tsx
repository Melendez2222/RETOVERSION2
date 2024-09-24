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
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);


  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedIndex(category);
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
    // const validIndex = selectedIndex !== null ? selectedInd  
    const categoryComponents: { [key: string]: JSX.Element } = {
      'CAMISA': <Camisa selectedIndex={selectedCategory} products={productItems} addToCart={addToCart}/>,
      'PANTALON': <Pantalon selectedIndex={selectedCategory} products={productItems} addToCart={addToCart}/>,
      'CALZADO': <Calzado selectedIndex={selectedCategory} products={productItems} addToCart={addToCart}/>,
      'ASEO_PERSONAL': <AseoPersonal selectedIndex={selectedCategory} products={productItems} addToCart={addToCart}/>,
      'LIMPIEZA': <Limpieza selectedIndex={selectedCategory} products={productItems} addToCart={addToCart}/>,
    };
    return categoryComponents[selectedCategory] || (
      <div className="container-items">
        {productItems.map((product) => (
          <div className="item" key={product.id_Product}>
            <figure>
              <img src={`./src/assets/product/${product.productCode}.jpg`} alt={product.productName} />
            </figure>
            <div className="info-product">
              <h2>{product.productName}</h2>
              <div className='rate'>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
              </div>
              <p className="price">${product.price}</p>
              <p className="price">Stock:{product.stock}</p>
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

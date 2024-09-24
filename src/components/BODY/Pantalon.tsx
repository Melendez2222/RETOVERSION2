import React from 'react'
import {PantalonProps} from "./Interfaces"
const Pantalon: React.FC<PantalonProps>  = ({selectedIndex, products,addToCart}) => {
  const filteredItems = products.filter(item => item.category === selectedIndex);
  return (
    <div className="container-items">
        {filteredItems.map((product) => (
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
              <button onClick={() => addToCart(product)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
  )
}

export default Pantalon
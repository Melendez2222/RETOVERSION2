import React from 'react'
import {LimpiezaProps} from "./Interfaces"
const Limpieza: React.FC<LimpiezaProps> = ({selectedIndex, products}) => {
  
  const filteredItems = products.filter(item => item.categoria_pro_id === selectedIndex);
  return (
    <div className="container-items">
        {filteredItems.map((product) => (
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
              <button>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
  )
}

export default Limpieza
import React from 'react'
import { CartProps } from './Interfaces'
import "./Cart.css"

const Cart:React.FC<CartProps> = ({addToCart, cartItems, decreaseQty,deleteQty}) => {
    const totalPrice = cartItems.reduce((precio, item) => {
        const qty=item.qty?? 0;
        const precioItem=item.price?? 0;
        return precio+qty*precioItem;
    }, 0).toFixed(2)
    return (
        <>
            <section className='cart-items'>
                <div className='container d_flex'>
                    <div className='cart-details'>
                        {cartItems.length === 0 && <h1 className='no-items product'>No Product are add in Cart</h1>}
                        {cartItems.map((item) => {
                            const productQty = ((item.price?? 0) * (item.qty ?? 0)).toFixed(2)
                            return (
                                <div className='cart-list product d_flex' key={item.id_Product}>
                                    <div className='img'>
                                        <img src={`./src/assets/product/${item.productCode}.jpg`} alt='' />
                                    </div>
                                    <div className='cart-details'>
                                        <h3>{item.productName}</h3>
                                        <h4>
                                            ${item.price} * {item.qty}
                                            <span>${productQty}</span>
                                        </h4>
                                    </div>
                                    <div className='cart-items-function'>
                                        <div className='removeCart'>
                                            <button className='removeCart' onClick={() => deleteQty(item)}>
                                                <i className='fa-solid fa-xmark'></i>
                                            </button>
                                        </div>
                                        <div className='cartControl d_flex'>
                                            <button className='incCart' onClick={() => addToCart(item)}>
                                                <i className='fa-solid fa-plus'></i>
                                            </button>
                                            <button className='desCart' onClick={() => decreaseQty(item)}>
                                                <i className='fa-solid fa-minus'></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='cart-item-price'></div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='cart-total product'>
                        <h2>Cart Summary</h2>
                        <div className=' d_flex'>
                            <h4>Total Price :</h4>
                            <h3>${totalPrice}</h3>
                        </div>
                    </div>
                </div>
            </section>
        </>
        // <div>Carrito de Compras</div>
    )
}

export default Cart
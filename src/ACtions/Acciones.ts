import { useDispatch } from "react-redux";
import { Product } from "../components/BODY/Interfaces";
import { addToCart } from "../Redux/cartSlice";
import { addCartItem } from "../services/Request";
const dispatch = useDispatch();
export const addToCartFA=async(producto:Product)=>{
    try {
        
        await addCartItem(cartItemDetail);
        dispatch(addToCart(product));
        alert('Producto agregado al carrito exitosamente');
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar el producto al carrito');
    }
}
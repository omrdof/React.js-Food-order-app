import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import Modal from "./Modal";

export default function CartModal({isCartOpen, cartHide, CheckoutOpen}) {
    const {items, addItem, reduceItem} = useContext(CartContext)
    const cartTotal = items.reduce((total, item)=>{
        return(
            total + item.quantity * item.price
        )
    }, 0)
    return<Modal customClass="cart" open ={isCartOpen} onClose={isCartOpen? cartHide : null}>
        <h2>Your Cart</h2>
        <ul>{items.map((item)=>(
            <li key={item.id} className="cart-item">
                <p>{item.name} - {item.quantity} X ${item.price}</p>
                <p className="cart-item-actions">
                    <button onClick={()=>addItem(item)}>+</button>
                    <span>{item.quantity}</span>
                    <button onClick={()=>reduceItem(item)}>-</button>
                </p>
            </li>
        ))}
        </ul>
        <p className="cart-total">$ {cartTotal}</p>
        <p className="modal-actions">
            <button className="text-button" onClick={cartHide}>Close</button>
            {items.length > 0 && <button className="button" onClick={CheckoutOpen}>Go to Checkout</button>}
        </p>
    </Modal>
}
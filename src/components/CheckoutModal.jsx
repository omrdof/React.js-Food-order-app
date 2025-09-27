import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import Modal from "./Modal";
import Input from "./Input";
import useHttp from "../custom hooks/useHttp";

const requestConfig = {
    method: "POST",
    headers:{'Content-Type': 'application/json'},    
}

export default function CheckoutModal({isCheckoutOpen, CheckoutOpen, CheckoutHide}) {
    const {items, clearCart} = useContext(CartContext)
    
    const cartTotal = items.reduce((total, item)=>{
        return(
            total + item.quantity * item.price
        )
    }, 0)

    const{data, isLoading, error, sendRequest, clearData} = useHttp("https://react-js-food-order-app-backend.vercel.app/orders", requestConfig)
    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target)
        const userData = Object.fromEntries(fd.entries())

        sendRequest(JSON.stringify({
                order:{
                    items: items,
                    customer: userData
                }
            }))
    }
    function handleFinish() {
        CheckoutHide();
        clearCart();
        clearData();
    }
    let actions = (
    <>
        <button className="text-button" type="button" onClick={CheckoutHide}>Close</button>
        <button className="button">Submit Order</button>
    </>)
    if (isLoading) {
        actions = (<span>Sending Data ...</span>)
    }

    if (data && !error) {
        
        return<Modal open ={isCheckoutOpen} onClose={isCheckoutOpen? CheckoutOpen : null}>
            <h2>Order submited sucssesfuly</h2>
            <p>Thank u for using our website</p>
            <button className="button" type="button" onClick={handleFinish}>Okay</button>
        </Modal>
    }
    return (
        <Modal open ={isCheckoutOpen} onClose={isCheckoutOpen? CheckoutOpen : null}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount {cartTotal}</p>
                <Input label="Full Name" type="text" id="full-name" name="name" />
                <Input label="Emai Address" type="email" id="email" name="email" />
                <Input label="Street" type="text" id="street" name="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" name="postal-code" />
                    <Input label="City" type="text" id="city" name="city" />
                </div>
                {error && 
                    <div className="error">
                        <h2>failed to submit the orders</h2>
                        <p>{error || "there is an Error"}</p>
                    </div>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}
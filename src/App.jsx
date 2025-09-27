import Header from "./components/Header";
import FoodList from "./components/FoodList";
import CartContextProvider from "./store/CartContext";
import CartModal from "./components/CartModal";
import { useState } from "react";
import CheckoutModal from "./components/CheckoutModal";

function App() {
  const [Progress, setProgress] = useState("")
  // const [isCartOpen, setIsCartOpen] = useState(false)
  // const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  function cartOpen() {
    setProgress("cart");
  }
  function cartHide() {
    setProgress("");
  }

  function CheckoutOpen() {
    setProgress("checkout");
  }
  function CheckoutHide() {
    setProgress("");
  }
  return (
    <CartContextProvider>
      <Header cartOpen={cartOpen}/>
      <FoodList />
      <CartModal isCartOpen={Progress === "cart"} cartHide={cartHide} CheckoutOpen={CheckoutOpen} />
      <CheckoutModal isCheckoutOpen={Progress === "checkout"} CheckoutOpen={CheckoutOpen} CheckoutHide={CheckoutHide} />
    </CartContextProvider>
  );
}

export default App;

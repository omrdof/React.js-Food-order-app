import { useContext } from "react"
import logo from "../assets/logo.jpg"
import { CartContext } from "../store/CartContext"

export default function Header({cartOpen}) {
    const {items} = useContext(CartContext)

    return(
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="App logo"/>
                <h1>ReactFood</h1>
            </div>
            <button className="text-button" onClick={cartOpen}>Cart({items.length})</button>
        </header>
    )
}


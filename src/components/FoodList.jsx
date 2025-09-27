import { useContext, useEffect, useState } from "react"
import { CartContext } from "../store/CartContext"
import useHttp from "../custom hooks/useHttp";

const requestConfig = {}
export default function nameFoodList() {
    const { addItem } = useContext(CartContext);
    const {data: meals, isLoading, error} = useHttp("https://react-js-food-order-app-backend.vercel.app/meals", requestConfig, [])
    
    
    if (isLoading) {
        return <p className="center">Loading Meals ...</p>
    }

    if (error) {
        return(
            <div className="error">
                <h2>Error</h2>
                <p>{error || "there is an Error"}</p>
            </div>
        )

    }
    
    return(
        <ul id="meals">
            {meals.map(meal=>(
                <li className="meal-item" key={meal.id}>
                    <article>
                        <img src={`https://react-js-food-order-app-backend.vercel.app/${meal.image}`} alt={meal.name} />
                        <div>
                            <h3>{meal.name}</h3>
                            <p className="meal-item-price">$ {meal.price}</p>
                            <p className="meal-item-description">{meal.description}</p>
                        </div>
                        <p className="meal-item-actions">
                            <button className="button" onClick={()=>{addItem(meal)}}>Add to card</button>
                        </p>
                    </article>
                </li>
            ))}
        </ul>
    )
}
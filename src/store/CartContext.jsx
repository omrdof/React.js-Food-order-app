import { createContext, useReducer } from "react";


export const CartContext = createContext({
    items: [],
    addItem: (item)=>{},
    reduceItem: (item)=>{},
    clearCart: ()=>{}
});
function reducer(oldState, action){
    let updatedItems = [...oldState.items];
    let itemIndex;

    switch (action.type) {

        case "ADD_ITEM":
            itemIndex = oldState.items.findIndex((item) => item.id === action.item.id)

            if (itemIndex !== -1) {
                updatedItems[itemIndex] = {
                    ...updatedItems[itemIndex],
                    quantity: updatedItems[itemIndex].quantity + 1,
                }
            }else{
                updatedItems = [...updatedItems, {...action.item, quantity: 1}]
            }
            return {
                ...oldState,
                items: updatedItems
            }
        case "REDUCE_ITEM":
            itemIndex = oldState.items.findIndex((item) => item.id === action.item.id)
            const itemsToReduce = oldState.items[itemIndex]
            if (itemsToReduce.quantity > 1) {
                updatedItems[itemIndex] = {...itemsToReduce,
                    quantity: itemsToReduce.quantity - 1}
            }else{
                updatedItems = oldState.items.filter((item) => item.id !== action.item.id);
            }

            return {
                ...oldState,
                items: updatedItems
            }
        case "CLEAR_CART":
                return {
                    ...oldState,
                    items: []
                }
        default:
            return oldState;
    }
}
export default function CartContextProvider({children}) {
    const[state, updateState] = useReducer(reducer, {items: []})

    const addItem = (item)=>{updateState({type: "ADD_ITEM", item})}
    const reduceItem = (item)=>{updateState({type: "REDUCE_ITEM", item})}
    const clearCart = ()=>{updateState({type: "CLEAR_CART"})}

    const contextValue = {
    items: state.items,
    addItem,
    reduceItem,
    clearCart
}
    return <CartContext.Provider value = {contextValue}>{children}</CartContext.Provider>
}
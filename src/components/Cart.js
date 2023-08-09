import { useDispatch, useSelector } from "react-redux";
import ItemList from './ItemList';
import { clearCart } from "../utils/cartSlice";

const Cart =() => {

    const cartItems = useSelector((store)=> {store.cart.items}); 
    console.log(cartItems + "  test");
    const dispatch = useDispatch();
    const handleClearCart =() => {
        dispatch(clearCart());
    }
    return (
        <div className="m-4 p-4 text-center">
            <h1 className="text-2xl font-bold">Cart</h1>
            <div className="w-6/12 m-auto">

                <button className="p-2 m-2 bg-black text-white rounded-lg" onClick={handleClearCart}>
                    Clear Cart
                </button>
                <ItemList items={cartItems}/>
            </div>
        </div>
    );
};


export default Cart;


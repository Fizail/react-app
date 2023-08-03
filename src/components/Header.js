import { useState } from "react";
import { LOGO_URL} from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header =() => {
    const [btn , setBtn] = useState('LogIn');
    const onlineStatus = useOnlineStatus();
    //console.log('Header Render');


// subscribing to the store using a Selector HOOK
    const cartItems = useSelector((store)=> store.cart.items);
    console.log(cartItems);
    return (
        <div className='flex justify-between bg-pink-100 shadow-lg'>
            <div className='logo'>
                <img className='w-40 rounded-lg' alt='logo' src={LOGO_URL}/>
            </div>
            <div className='nav-bar flex items-center'>
                <ul className="flex pr-4 ">
                    <li className="px-4 ">
                         {onlineStatus ? "🟢" : "🔴"}
                    </li>
                    <li className="px-4 hover:underline">
                        <Link to="./">Home</Link>
                         </li>
                    <li className="px-4 hover:underline">
                         <Link to="./About">About Us</Link> 
                         </li>
                        
                    <li className="px-4 hover:underline">
                        <Link to="./Contact">Contact Us</Link>
                    </li>
                    <li className="px-4 hover:underline">
                         <Link to="./Grocery">Grocery</Link> 
                         </li>
                    <li className="px-4 hover:underline"> 
                     <Link to="./cart"> Cart - ({cartItems.length} items)</Link> 
                     </li>
                    <button className='px-4  rounded-lg bg-blue-100' onClick={ () => {
                         btn === 'LogIn' ? setBtn('logOut'): setBtn('LogIn');
                    }
                     
                    }>{btn}</button>
                </ul>     
            </div>
        </div>
    )
}

export default Header;
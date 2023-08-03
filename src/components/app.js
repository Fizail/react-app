import React , {Suspense, lazy} from 'react';
import ReactDom from 'react-dom/client'; 
import Header from './Header';
import Footer from './Footer';
import Body from './body';
import { createBrowserRouter, RouterProvider , Outlet} from "react-router-dom";
import About from './About';
import Contact from './Contact';
import Error from './Error';
import RestaurantMenu from './RestaurantMenu';
import { Provider } from 'react-redux';
import appStore from '../utils/appStore';
import Cart from './Cart';
//import Grocery from './Grocery';

// using lazy load for grocery component (it is also known as)

// chunking
// code splitting
// dynamic bundling
// lazy loading
// on demand loading
// dynamic import 
const Grocery = lazy(() => import("./Grocery"));

const Applayout =() =>{
    return (
        <>
        <Provider store={appStore}>
            <Header/>
            <Outlet/>
            <Footer/>
        </Provider>
      </>
    )
}

const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <Applayout />,
    children: [
      {
        path : '/',
        element : <Body />,
        errorElement: <Error />
      },
      {
        path : '/about',
        element : <About />,
        errorElement: <Error />
      },
      {
        path : '/cart',
        element : <Cart />,
        errorElement: <Error />
      },
      {
        path : '/Grocery',
        element :<Suspense fallback={<h1>Loading.....!</h1>}> 
          <Grocery /> 
            </Suspense>,
        errorElement: <Error />
      },
      {
        path : '/contact',
        element : <Contact />,
        errorElement: <Error />
      },
      {
        path : '/restaurants/:resId',
        element : <RestaurantMenu />
      },

    ],
    errorElement: <Error />
  },
 
])
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);
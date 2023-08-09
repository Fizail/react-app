import {IMG_CDN_URL} from "../utils/constants";
import {useEffect, useState} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const RestaurantCard = (props) => {
    const {resData} = props;
    console.log(resData);
    const { cloudinaryImageId, name, cuisines, area, areaName, avgRating} = resData;
    return (
        <div className='res-card m-4 p-4  w-[250px]  h-[380px] bg-gray-200 shadow-lg rounded-xl hover:shadow-2xl  hover:rounded-3xl hover:font-extrabold'>
            <img className=" rounded-lg" alt='logo' src={IMG_CDN_URL + cloudinaryImageId}/>
            <h3 className=" font-bold py-3 text-lg">{name}</h3>
            <h4>{cuisines.join(' , ')}</h4>
            <h4>{avgRating + " Stars"}</h4>
            <h4> {area}</h4>
            <h4>{areaName}</h4>
        </div>
    )
}
/* 
 higher order component  making
 input wil be restaurant card and output will be a promoted restaurant
*/

const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return(
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        );
    };
};


const Body = () => {
    // using useState to filter Restaurants
    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    const [filteredRestaurant , setFilteredRestaurant] = useState([]);

    //console.log('body rendered', listOfRestaurants);

    const [searchText, setSearchText] = useState('');

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    useEffect(() => {
        fetchdata();
    }, []);

    const fetchdata = async() => {
        const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=34.1165563&lng=74.8163953&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
        const json = await data.json();
        console.log(json);
        setListOfRestaurants( json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant( json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    

    // to show a offline message if internet connection is not availible
    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false) return (
        <h1>Looks like your'e offline!! Please check your internet connection;</h1>
    )

  // conditional rendering
    if (listOfRestaurants.length === 0) {
        return <Shimmer/>
        console.log('shimmer');
    }else
    return (
        <div className="body">  
            <div className='filter flex'>
                <div className="search m-4 p-4 ">
                    <input type="text" className="border border-solid border-black" value={searchText} onChange={(e)=> {
                        setSearchText(e.target.value);
                    }}/>
                    <button className="px-4 py-2 bg-green-100 shadow m-4 rounded-lg hover:shadow-gray-500" onClick={()=> {
                        //console.log(searchText);
                     const filteredRestaurant = listOfRestaurants.filter((
                        res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                      setFilteredRestaurant(filteredRestaurant);
                    }}>Search</button>
                </div>
                <div className="flex items-center ">
                <button
                    className="px-3 py-2 bg-gray-100 rounded-lg  hover:shadow-xl"
                    onClick={() => {
                    const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 3);
                    setFilteredRestaurant(filteredList);
                   // console.log(filteredList);
                }}>
                    Top rated Restaurants</button>
                </div>
           
            </div>
            <div className='flex  flex-wrap'>
                {filteredRestaurant.map(restaurant => (
                <Link 
                    key = {restaurant?.info?.id} 
                    to={"/restaurants/"+ restaurant?.info?.id}>
                        {restaurant.info.promoted ? (<RestaurantCardPromoted resData = {restaurant?.info}/>) : 
                         (< RestaurantCard resData = {restaurant?.info } />)}
                        
                </Link> 
                ))}
               
            </div>
        </div>
    )
}
export default Body;
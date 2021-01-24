import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addToCart, removeOrderFromCart} from "../Actions/ordersAction";
import {placeOrders} from '../Actions/ordersAction';
import { Link } from 'react-router-dom';
const CartScreen = (props) => {
    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;
    const personalOrders = useSelector(state=>state.placedOrders);
    const {success, error,placedOrder} = personalOrders;
    console.log("personalOrders",personalOrders);
    const cart = useSelector(state=> state.cart);
    const { cartItems } = cart;
    const [pid, setPid] = useState('');
    console.log("cartItems", cartItems);
    const productId = props.match.params.id;
    const dispatch = useDispatch();
    console.log("productId", productId);
    const checkoutHandler = async() => { 
        if(userInfo) {  
            dispatch(placeOrders({cartItems},props.history)); 
        }
    }
    const deleteHandler = (orderId) => {
            dispatch(removeOrderFromCart(orderId))
    }
    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId));
        }
    },[productId]);
    return (
        <div className = "cartScreen">
            <div>
        {success&& <h4>Send To Server Successfully</h4>}
        {error&&<div>{error}</div>}
            <button onClick = {checkoutHandler}>Confirm</button>
           {!cartItems&& <p> Loading </p>}
          {cartItems &&
           <table>
           <thead>
               <tr>
                   <th>
                       State
                   </th>
                   <th>
                       City
                   </th>
                   <th>
                       Street
                   </th>
                   <th>
                       Order Number
                   </th>
                   <th>
                       Product
                   </th>
                   <th>
                       Created Date
                   </th>
               </tr>
           </thead>
           <tbody>
               {cartItems.map(order=>
                   <tr key={order.orderId+'will'}>
                       <td>{order.state}</td>
                       <td>{order.city}</td>
                       <td>{order.street}</td>
                       <td>{order.orderId}</td>
                       <td>{order.product}</td>
                       <td>{order.date}</td>
                       <td><button onClick = {()=>deleteHandler(order.orderId)}>DELETE</button></td>
                   </tr>
               )}
           </tbody>

       </table>
        }
        </div>
    </div>
    )
}
export default CartScreen;
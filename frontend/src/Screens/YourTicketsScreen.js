import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getYourTickets} from '../Actions/ordersAction';
import {Link} from 'react-router-dom';
const YourTicketsScreen = (props) => {
    const yourTickets = useSelector(state=> state.getYourTickets);
    const {yourtickets, success} = yourTickets;
    const [clearReject, setClearReject] = useState(false);
    console.log("yourtickets",yourtickets);
    const dispatch = useDispatch();

    const condition = (order) => {
        console.log('in condition');
        console.log("clearReject",clearReject);
        if(clearReject) {
            
            return order.status !== "REJECT"
        }
        return true
    }
    const releaseHandler = (orderId) => {
        props.history.push(`/uploadimage/${orderId}`); 
    }
    useEffect(()=>{
        setClearReject(false)
        dispatch(getYourTickets())
    },[])
    return (
        <div className="yourTickets">
            <h1>Your Tickets</h1>
            <button onClick = {() => setClearReject(true)}>Clear Rejected Order</button>
             {!yourtickets&& <p> Loading </p>}
          {yourtickets &&
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
                   <th>
                       Status
                   </th>
               </tr>
           </thead>
           <tbody>
               {yourtickets[0]&&yourtickets[0].ordersItems.map(order=>
                    condition(order) &&<tr key={order.orderId+'will'}>
                       <td>{order.state}</td>
                       <td>{order.city}</td>
                       <td>{order.street}</td>
                       <td>{order.orderId}</td>
                       <td>{order.product}</td>
                       <td>{order.date}</td>
                       <td>{order.status}</td>
                       {order.status==="RELEASE"&&<td><button onClick={()=>releaseHandler(order.orderId)}>DELIVERED</button></td>}
                       {order.status==="DELIVERED"&&<td><button onClick={()=>releaseHandler(order.orderId)}>UPDATE PHOTO</button></td>}
                   </tr>
               )}
           </tbody>

       </table>
        }

        </div>

    )
}
export default YourTicketsScreen;
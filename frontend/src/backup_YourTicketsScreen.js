import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getYourTickets, removeYourRejectedTickets} from '../Actions/ordersAction';
const YourTicketsScreen = (props) => {
    const yourTickets = useSelector(state=> state.getYourTickets);
    const {yourtickets, success} = yourTickets;
    const yourLeftTickets = useSelector(state=> state.leftTickets);
    const {success: clearSuccess} = yourLeftTickets;
    const [clearReject, setClearReject] = useState(false);
    const [count, setCount] = useState(1);
    console.log("yourtickets",yourtickets);
    const dispatch = useDispatch();

    const condition = (order) => {
        console.log('in condition');
        console.log('clearReject', clearReject);
        if(clearReject) {
            dispatch(removeYourRejectedTickets());
            return order.status !== "REJECT"
        }
        return true
    }
    const removeRejectedTickets = () => {
        console.log("no cache call removeYourRejectedTickets");
        dispatch(removeYourRejectedTickets());
    }
    useEffect(()=>{
        dispatch(getYourTickets())
       
    },[])
    return (
        <div>
            <button onClick = {removeRejectedTickets}>Clear Rejected Order</button>
            <h1>Your Tickets</h1>
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
                   <tr key={order.orderId+'will'}>
                       <td>{order.state}</td>
                       <td>{order.city}</td>
                       <td>{order.street}</td>
                       <td>{order.orderId}</td>
                       <td>{order.product}</td>
                       <td>{order.date}</td>
                       <td>{order.status}</td>
                   </tr>
               )}
           </tbody>

       </table>
        }

        </div>

    )
}
export default YourTicketsScreen;
import React, { useEffect } from 'react';
import { getTickets } from '../Actions/ordersAction';
import { useDispatch, useSelector } from 'react-redux';
import DeliveredPayTable from '../Components/DeliveredPayTable';

const PayDelivery = () => {
    const alltickets = useSelector(state=>state.getTickets);
    const {tickets} = alltickets
  
    const dispatch = useDispatch(); 
    
    const showTicket = (ticket) => {
        let arr = [];
            for (let order of ticket.ordersItems) {
                if(order.status==="DELIVERED") {
                    arr.push(order);
                   
                }
            }
           
            return arr;
    }
   
    useEffect(()=>{
        dispatch(getTickets())
    },[])

    return (
        <div className="payDelivery"> 
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Finished Tickets</th>
                        <th>Pay</th>
                    </tr>
                </thead>
                <tbody>
                {tickets&&tickets.map(ticket => {
                    let arr = showTicket(ticket);
                    return arr.length>0&& 
                            
                            <DeliveredPayTable 
                                key = {'payment'+ticket.userId }
                                arr = {arr}
                                userId = {ticket.userId}
                            />
                                  
                }

                )
                    
                }
                </tbody>
            </table>
        </div>


    )

}
export default PayDelivery;
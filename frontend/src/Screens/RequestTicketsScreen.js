import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getTickets} from '../Actions/ordersAction';
import TicketsRow from '../Components/ticketsTable';
import {acceptOrder,rejectOrder} from '../Actions/ordersAction';

const RequestTickestsScreen = () => {
    const allTickets = useSelector(state => state.getTickets);
    const {tickets, loading} = allTickets;
    const dispatch = useDispatch();
    useEffect(()=>{
            dispatch(getTickets())
    },[])
    
    return (
        <div className="requestTicketsScreen">
            <h2>All Tickets</h2>
            <table>
                <thead>
                    <tr>
                        <th>Requestor's ID</th>
                        <th>Requestor's Name</th>
                        <th>Requestor's City</th>
                        <th>Ticket's City</th>
                        <th>Ticket's Number</th>
                        <th>Ticket's Created Date</th>
                        <th>Product</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {loading?<tr><td>loading</td></tr>:
                     tickets && tickets.map && tickets.map(ticket=>
                        ticket.ordersItems&&ticket.ordersItems.map(order => 
                            <TicketsRow 
                            userId = {ticket.userId} 
                            key = {order._id+'Loren'}
                            city = {order.city}
                            orderId = {order.orderId}
                            date = {order.date.substring(0,10)}
                            product = {order.product}
                            status = {order.status}
                            imagePath= {order.imagePath}
                            />
                            ))}
                </tbody>
            </table>

        </div>
    )
}
export default RequestTickestsScreen;
import React, { useEffect, Fragment, useState }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { acceptOrder, rejectOrder, releaseOrder } from '../Actions/ordersAction';
import { deliverSuccessReducer } from '../Reducers/ordersReducer';

const TicketsTable = (props) => {

    const getTicketStatus = useSelector(state => state.getStatus);
    const {ticketsStatus} = getTicketStatus;
    
    const [status, setStatus] = useState(props.status)
    const [userId, setUserId] = useState(props.userId)
    const [city, setCity] = useState(props.city)
    const [orderId, setOrderId] = useState(props.orderId)
    const [date, setDate] = useState(props.date)
    const [product, setProduct] = useState(props.product)
    const [deliveredImage, setDeliveredImage] = useState();
    const ticketStatus = ticketsStatus?ticketsStatus[`${userId}_${orderId}`]:null;
    console.log("all ticketStatus",ticketsStatus);
    const dispatch = useDispatch();
    const acceptHandler = (userId, orderId) => {
        console.log("orderID", orderId);
        dispatch(acceptOrder(userId, orderId)) 
    }
    const rejectHandler = (userId, orderId) => {
        dispatch(rejectOrder(userId, orderId)) 
    }
    const releaseHandler = (userId, orderId) => {
        dispatch(releaseOrder(userId, orderId)) 
    }
    const checkImageHandler = (imagePath) => {
        if(!deliveredImage) {
        setDeliveredImage(<img src={imagePath} />)
        }
        if(deliveredImage) {
            setDeliveredImage();
        }
    }
    
    useEffect(()=>{
             console.log('ticketStatus',ticketStatus);
             console.log('status',status);
             if(ticketStatus&&ticketStatus!==status){
                setStatus(ticketStatus)
             }
    },[ticketStatus])
    return (
        <Fragment>
            <tr>
                <td>{userId}</td>
                <td>name</td>
                <td>city</td>
                <td>{city}</td>
                <td>{orderId}</td>
                <td>{date}</td>
                <td>{product}</td>
                <td>{status}</td>
                <td><button onClick={()=>acceptHandler(userId, orderId)}>ACCEPT</button></td>
                <td><button onClick={()=>rejectHandler(userId, orderId)}>REJECT</button></td>
                {status==="ACCEPT"&&<td><button onClick={()=>releaseHandler(userId, orderId)}>RELEASE</button></td>}
                {status==="DELIVERED"&&<td><button onClick={()=>checkImageHandler(props.imagePath)}>DELIVERED CHECK</button></td>}
                <td>{deliveredImage}</td>
            </tr>   
        </Fragment>
    )
}
export default TicketsTable;
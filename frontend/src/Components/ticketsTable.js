import React, { useEffect, Fragment, useState }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrder,acceptOrder, rejectOrder, releaseOrder } from '../Actions/ordersAction';
import PopupModal from './PopupModal/PopupModal';

const TicketsTable = (props) => {

    const getTicketStatus = useSelector(state => state.getStatus);
    const {ticketsStatus} = getTicketStatus;
    
    const [status, setStatus] = useState(props.status)
    const [userId, setUserId] = useState(props.userId)
    const [city, setCity] = useState(props.city)
    const [orderId, setOrderId] = useState(props.orderId)
    const [date, setDate] = useState(props.date)
    const [product, setProduct] = useState(props.product)
    const [driverCity, setDriverCity] = useState(props.driverCity)
    const [driverName, setDriverName] = useState(props.driverName)
    const [deliveredImage, setDeliveredImage] = useState();
    const [showing, setShowing] = useState(false);
    const [imagePath, setImagePath] = useState();
    const ticketStatus = ticketsStatus?ticketsStatus[`${userId}_${orderId}`]:null;
    const [remove, setRemove] = useState(false);
    const [count, setCount] = useState(1);
    console.log("all ticketStatus",ticketsStatus);
    const dispatch = useDispatch();
    const acceptHandler = (userId, orderId) => {
        console.log("orderID", orderId);
        dispatch(acceptOrder(userId, orderId)) 
    }
    const rejectHandler = (userId, orderId) => {
        dispatch(rejectOrder(userId, orderId)) 
    }
    const deletetHandler = (userId, orderId) => {
        dispatch(deleteOrder(userId, orderId)) 
        setRemove(true);
    }
    const releaseHandler = (userId, orderId) => {
        dispatch(releaseOrder(userId, orderId)) 
    }
    const closeModalHandler = () => {
         setShowing(false);
    }
    const imageClickHandler = () => {
          setShowing(true)
    }
    const checkImageHandler = (imagePath) => {
        setImagePath(imagePath);
        if(!deliveredImage) {
        setDeliveredImage(
            <img onClick = {imageClickHandler} className="deliverImage" src={imagePath} />
        )
        }
        if(deliveredImage) {
            setDeliveredImage();
        }
    }
    
    useEffect(()=>{
        console.log('ticketStatus',ticketStatus);
        console.log('status',status);
           if(count===1&&ticketStatus&&ticketStatus!==status) {
                setStatus(status);
           }
           else  if(count!==1&&ticketStatus&&ticketStatus!==status) {
                
                setStatus(ticketStatus)
             
            }
            setCount(prev=>prev+1);
    },[ticketStatus])
    return (
         <Fragment>
            {remove? null :<tr>
                <td>{userId}</td>
                <td>{driverName}</td>
                <td>{driverCity}</td>
                <td>{city}</td>
                <td>{orderId}</td>
                <td>{date}</td>
                <td>{product}</td>
                <td>{status}</td>
               
                <td><button className="myButton" onClick={()=>acceptHandler(userId, orderId)}>ACCEPT</button></td>
                <td><button className="rejectButton" onClick={()=>rejectHandler(userId, orderId)}>REJECT</button></td>
                {status==="ACCEPT"&&<td><button className="releaseButton" onClick={()=>releaseHandler(userId, orderId)}>RELEASE</button></td>}
                {status==="DELIVERED"&&<td>{deliveredImage}<button className="deliverCheckButton" onClick={()=>checkImageHandler(props.imagePath)}>DELIVERED CHECK</button></td>}
                
                {(status==="DELIVERED")&&<td><button className="deleteButton" onClick={()=>deletetHandler(userId, orderId)}>DELETE</button></td>}
           
                <td>
                    <PopupModal show = {showing} closeModal = {closeModalHandler}>
                    <img  className="PopupModalImage"  src={imagePath} />
                    </PopupModal> 
                </td>
            </tr> 
            }
        </Fragment>
        
    )
}
export default TicketsTable;
import React,{useState, Fragment} from 'react';

const DeliveredPayTable = (props) => {
    const [orderDetail, setOrderDetail] = useState();
    const showTicketsHandler = (arr) => {

        let deliveredArr = [];
          for(let order of arr) {
               if(order.status=="DELIVERED") {
                   deliveredArr.push(order.orderId);
               }
          }
           //window.alert("Delivered orders' id are\n" + deliveredArr.join('\n'));
          setOrderDetail(deliveredArr.join('/ '));
   
       }
    return (
        <Fragment>
             <tr>
                <td>{props.userId}</td>
                <td>useName</td>
                <td onClick={()=>showTicketsHandler(props.arr)}>{props.arr.length}</td>
                <td><button>Pay</button></td>
                <td>{orderDetail}</td>
            </tr>  
                            
        </Fragment>
    )
}
export default DeliveredPayTable

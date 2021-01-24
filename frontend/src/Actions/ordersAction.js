import Axios from 'axios';
import Cookie from "js-cookie";
import {ORDERSLIST_REQUEST, ORDERSLIST_SUCCESS,ORDERSLIST_FAIL, GET_ALL_ORDER_LIST_REQUEST, GET_ALL_ORDER_LIST_SUCCESS, GET_ALL_ORDER_LIST_FAIL, CART_ADD_ITEM, CART_FAIL, CART_REMOVE_ITEM, PLACE_ORDERS_REQUEST, PLACE_ORDERS_SUCCESS, PLACE_ORDERS_FAIL, GET_TICKETS_REQUEST, GET_TICKETS_SUCCESS, GET_TICKETS_FAIL, GET_YOUR_TICKETS_REQUEST, GET_YOUR_TICKETS_SUCCESS, GET_YOUR_TICKETS_FAIL, ACCEPT_ORDER_REQUEST, ACCEPT_ORDER_SUCCESS, ACCEPT_ORDER_FAIL, REJECT_ORDER_FAIL, REJECT_ORDER_SUCCESS, REJECT_ORDER_REQUEST, GET_STATUS_FAIL, GET_STATUS_SUCCESS, GET_STATUS_REQUEST, EMPTY_CART, REMOVE_YOUR_REJECTED_TICKETS_FAIL, REMOVE_YOUR_REJECTED_TICKETS_SUCCESS, REMOVE_YOUR_REJECTED_TICKETS_REQUEST, RELEASE_ORDER_REQUEST, RELEASE_ORDER_SUCCESS, RELEASE_ORDER_FAIL, UPDATE_IMAGEPATH_FAIL, UPDATE_IMAGEPATH_SUCCESS, GET_IMAGEPATH_SUCCESS, GET_IMAGEPATH_FAIL, GET_IMAGEPATH_REQUEST, DELIVER_SUCCESS_REQUEST, DELIVER_SUCCESS_SUCCESS, DELIVER_SUCCESS_FAIL} from '../Constant/ordersConstant';
export const ordersCreate = (infor) => dispatch =>{

    dispatch({
        type: ORDERSLIST_REQUEST, payload: infor
    })
   Axios.post('api/orders/creatingordersList', infor)
    .then(
        response => {
            const {data} = response;
            console.log("data", data)
            dispatch({
                type: ORDERSLIST_SUCCESS,
                payload: data            
            })
        }
    )
    .catch(error => {
        dispatch({
            type: ORDERSLIST_FAIL,
            payload: error.message
        })
    })

}
export const getAllOrderList = () => dispatch => {
    dispatch({type: GET_ALL_ORDER_LIST_REQUEST});
    Axios.get('api/orders/getallorders')
    .then(
        response => {
            const {data} = response;
            console.log("all orders", data);
            dispatch({type: GET_ALL_ORDER_LIST_SUCCESS, payload: data})
        }
    )
    .catch(error => 
        dispatch({type: GET_ALL_ORDER_LIST_FAIL, payload: error.message})
    )
    
}
export const placeOrders = (infor, router) => (dispatch, getState) => {
    console.log("placeorder");
    const{userSignin: {userInfo}} = getState();
    dispatch({type:PLACE_ORDERS_REQUEST});
    console.log("infor", infor);

    Axios.post('/api/orders/placeorders', infor,
        {
            headers: {
                Authorization: 'william '+ userInfo.token
            }
        }
    )
    .then(
        response => {
            router.push('/yourtickets')
            const {data} = response;
            console.log("personal order datat",data);
            dispatch({type: PLACE_ORDERS_SUCCESS, paylaod: data})

        }
    )
    .catch(error =>
        dispatch({type: PLACE_ORDERS_FAIL, payload: error.message}))
    dispatch({type: EMPTY_CART})
    Cookie.remove("cartItems_delivery");
    
}

export const addToCart = (orderId) => (dispatch, getState) => {
    const{userSignin: {userInfo}} = getState();
    Axios.get("/api/orders/" + orderId, {
        headers: {
            Authorization: 'william '+ userInfo.token
        }
    })
    .then(
        response => {
            const {cart: {cartItems}} = getState();
            const {data} = response;
            console.log("add to cart data", data);
            dispatch({
                type: CART_ADD_ITEM, payload: {
                    orderId: data._id,
                    state: data.state,
                    city: data.city,
                    street: data.street,
                    ordernumber: data.ordernumber,
                    product: data.product,
                    date: data.updatedAt
                }
            })
             Cookie.set("cartItems_delivery", JSON.stringify(cartItems));
          
        }
        
        
    )
    .catch(error => dispatch({type:CART_FAIL, payload: error.message}))
} 
export const removeOrderFromCart = (OrderId) => (dispatch,getState) => {
    const {cart: {cartItems}} = getState();
    dispatch({type: CART_REMOVE_ITEM, payload:OrderId});
    Cookie.set("cartItems_delivery", JSON.stringify(cartItems));
}

export const getTickets = () => (dispatch, getState) => {
    console.log("get tickets herre");
    const {userSignin:{userInfo}} = getState();
    dispatch({type: GET_TICKETS_REQUEST});
    Axios.get("/api/orders/tickets",
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            console.log("getTickets", data);
            dispatch({type: GET_TICKETS_SUCCESS, payload: data})
        }
    )
    .catch(error => dispatch({type: GET_TICKETS_FAIL, payload: error.message}))
}

export const getYourTickets = (router,orderId) => (dispatch, getState) => {
    console.log("get tickets herre");
    const {userSignin:{userInfo}} = getState();
    dispatch({type: GET_YOUR_TICKETS_REQUEST});
    Axios.get("/api/orders/yourtickets",
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            console.log("getYourTickets", data);
            dispatch({type: GET_YOUR_TICKETS_SUCCESS, payload: data})
            if(router&&orderId) {
                router.push(`/signin?redirect=/orders/${orderId}`); 
            }
        }
    )
    .catch(error => dispatch({type: GET_YOUR_TICKETS_FAIL, payload: error.message}))
}

export const removeYourRejectedTickets = () => (dispatch, getState) => {
    console.log("get tickets herre");
    const {userSignin:{userInfo}} = getState();
    dispatch({type: REMOVE_YOUR_REJECTED_TICKETS_REQUEST});
    Axios.delete("/api/orders/removeyourrejectedtickets/",
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            console.log("updateYourTickets", data);
            dispatch({type: REMOVE_YOUR_REJECTED_TICKETS_SUCCESS, payload: data})
            dispatch(getYourTickets());
        }
    )
    .catch(error => dispatch({type: REMOVE_YOUR_REJECTED_TICKETS_FAIL, payload: error.message}))
}

export const acceptOrder = (userId, orderId) =>(dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    dispatch({type:ACCEPT_ORDER_REQUEST});
    Axios.put("/api/orders/acceptorder/"+userId, {orderId},
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            console.log("accept data", data)
            dispatch({type:ACCEPT_ORDER_SUCCESS, payload: data})
            dispatch(getStatus(userId, orderId))
            Cookie.set("getAllTickets", JSON.stringify(data));
        }
    )
    .catch( error => dispatch({type: ACCEPT_ORDER_FAIL, payload: error.message}))
}

export const rejectOrder = (userId, orderId) =>(dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    dispatch({type:REJECT_ORDER_REQUEST});
    
    Axios.put("/api/orders/rejectorder/"+userId, {orderId},
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            dispatch({type:REJECT_ORDER_SUCCESS, payload: data})
            dispatch(getStatus(userId, orderId))
            Cookie.set("getAllTickets", JSON.stringify(data));
        }
    )
    .catch( error => dispatch({type: REJECT_ORDER_FAIL, payload: error.message}))
}

export const releaseOrder = (userId, orderId) =>(dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    dispatch({type:RELEASE_ORDER_REQUEST});
    
    Axios.put("/api/orders/releaseorder/"+userId, {orderId},
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            dispatch({type:RELEASE_ORDER_SUCCESS, payload: data})
            dispatch(getStatus(userId, orderId))
            Cookie.set("getAllTickets", JSON.stringify(data));
            console.log("releaseOrder", data)
        }
    )
    .catch( error => dispatch({type: RELEASE_ORDER_FAIL, payload: error.message}))
}

export const getStatus = (userId, orderId) =>(dispatch, getState) => {
    const {getStatus:{ticketsStatus}} = getState();
    const {userSignin:{userInfo}} = getState();
    console.log("ticketsStatus",ticketsStatus);
    dispatch({type:GET_STATUS_REQUEST, payload: ticketsStatus});
    console.log("get Satus userInfo.token",userInfo.token);
    Axios.get(`/api/orders/getstatus/${userId}_${orderId}`,
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            console.log('statuse data', data);
            const passData = {userOrderId:`${userId}_${orderId}`,status:data}
            console.log('userOrderId data', passData);
            dispatch({type:GET_STATUS_SUCCESS, payload: passData})
            
          //  Cookie.set("getTicketsStatus", JSON.stringify(ticketsStatus));
        }
    )
    .catch( error => dispatch({type: GET_STATUS_FAIL, payload: error.message}))
}

export const getImagePath = (orderId) =>(dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    dispatch({type:GET_IMAGEPATH_REQUEST});

    Axios.get("/api/orders/updateimagepath/"+orderId,
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            dispatch({type:GET_IMAGEPATH_SUCCESS, payload: data})
          
        }
    )
    .catch( error => dispatch({type: GET_IMAGEPATH_FAIL, payload: error.message}))
}

export const updateImagePath =(orderId, imagePath)=> (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
   
    Axios.put("/api/orders/updateimagepath/"+orderId, {imagePath},
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            dispatch({type:UPDATE_IMAGEPATH_SUCCESS, payload: data})
          
        }
    )
    .catch( error => dispatch({type: UPDATE_IMAGEPATH_FAIL, payload: error.message}))
}

export const deliverSuccess =(orderId)=> (dispatch, getState) => {
    const {userSignin:{userInfo}} = getState();
    dispatch({type:DELIVER_SUCCESS_REQUEST});
    Axios.put("/api/orders/deliversuccess/"+orderId, {userInfo},
    {
        headers: {
            Authorization: "william "+userInfo.token
        }
    }
    )
    .then(
        response => {
            const {data} = response;
            dispatch({type:DELIVER_SUCCESS_SUCCESS, payload: data})
          
        }
    )
    .catch( error => dispatch({type: DELIVER_SUCCESS_FAIL, payload: error.message}))
}
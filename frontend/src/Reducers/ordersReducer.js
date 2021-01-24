import {ORDERSLIST_REQUEST, ORDERSLIST_SUCCESS,ORDERSLIST_FAIL, GET_ALL_ORDER_LIST_REQUEST, GET_ALL_ORDER_LIST_SUCCESS, GET_ALL_ORDER_LIST_FAIL, CART_ADD_ITEM, CART_REMOVE_ITEM, PLACE_ORDERS_REQUEST, PLACE_ORDERS_SUCCESS, PLACE_ORDERS_FAIL, GET_TICKETS_SUCCESS, GET_TICKETS_REQUEST, GET_TICKETS_FAIL, GET_YOUR_TICKETS_REQUEST, GET_YOUR_TICKETS_SUCCESS, GET_YOUR_TICKETS_FAIL, ACCEPT_ORDER_REQUEST, ACCEPT_ORDER_SUCCESS, ACCEPT_ORDER_FAIL, REJECT_ORDER_REQUEST, REJECT_ORDER_SUCCESS, REJECT_ORDER_FAIL, GET_STATUS_FAIL, GET_STATUS_SUCCESS, GET_STATUS_REQUEST, EMPTY_CART, REMOVE_YOUR_REJECTED_TICKETS_FAIL, REMOVE_YOUR_REJECTED_TICKETS_SUCCESS, REMOVE_YOUR_REJECTED_TICKETS_REQUEST, RELEASE_ORDER_REQUEST, RELEASE_ORDER_SUCCESS, RELEASE_ORDER_FAIL, GET_IMAGEPATH_REQUEST, GET_IMAGEPATH_SUCCESS, GET_IMAGEPATH_FAIL, UPDATE_IMAGEPATH_SUCCESS, UPDATE_IMAGEPATH_FAIL, DELIVER_SUCCESS_REQUEST, DELIVER_SUCCESS_SUCCESS, DELIVER_SUCCESS_FAIL} from '../Constant/ordersConstant';

const orderCreateReducer = (state={}, action) =>{
    switch (action.type) {
        case ORDERSLIST_REQUEST:
            return {loading: true, success: false};
        case ORDERSLIST_SUCCESS:
            return {loading: false, success: true}
        case ORDERSLIST_FAIL:
            return {loading: false, error:action.payload, success: false};
        default: return state;
    }
}
const allOrderListReducer = (state={}, action) => {
    switch (action.type) {
        case GET_ALL_ORDER_LIST_REQUEST:
            return {loading: true}
        case GET_ALL_ORDER_LIST_SUCCESS:
            return {loading: false, allOrderList: action.payload};
        case GET_ALL_ORDER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default: return state;
    }
}
const cartReducer = (state = {cartItems:[]}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            console.log("item",item);
            console.log("state", state);
            console.log("state.cartItems",state.cartItems);
            
            const order = state.cartItems.find(x => x.orderId === item.orderId);
            if (order) {
                return {
                    cartItems:
                    state.cartItems.map(x => x.orderId === order.orderId? item: x)
                };
                }
                return { cartItems: [...state.cartItems, item]};

        case CART_REMOVE_ITEM:
            const itemId = action.payload;
            const cartItemsTem = state.cartItems.filter(x => x.orderId !== itemId) 
            return {cartItems: cartItemsTem}
        case EMPTY_CART:
            return {cartItems: []}
            default: return state;
    }    
}
const placeOrdersReducer = (state = {}, action) =>{
    switch (action.type) {
        case PLACE_ORDERS_REQUEST:
            return {
                loading: true, success: false
            }
        case PLACE_ORDERS_SUCCESS:
            return {
                success: true, loading:false, placedOrder:action.payload
            }
        case PLACE_ORDERS_FAIL:
            return {
                success: false, loading:false, error:action.payload
            }
        default: return state
    }

}
const getTicketsReducer = (state={}, action) => {
    switch(action.type) {
        case GET_TICKETS_REQUEST:
            return {loading: true}
        case GET_TICKETS_SUCCESS:
            return {loading: false, tickets: action.payload}
        case GET_TICKETS_FAIL:
            return {loading: false, error: action.payload}
        default: return state;
    }
}

const removeYourRejectedTicketsReducer = (state={}, action) => {
    switch(action.type) {
        case REMOVE_YOUR_REJECTED_TICKETS_REQUEST:
            return {loading: true, success:false}
        case REMOVE_YOUR_REJECTED_TICKETS_SUCCESS:
            return {loading: false, leftTickets: action.payload, success: true}
        case REMOVE_YOUR_REJECTED_TICKETS_FAIL:
            return {loading: false, error: action.payload, success: false}
        default: return state;
    }
}

const getYourTicketsReducer = (state={}, action) => {
    switch(action.type) {
        case GET_YOUR_TICKETS_REQUEST:
            return {loading: true, success: false}
        case GET_YOUR_TICKETS_SUCCESS:
            return {loading: false, success: true, yourtickets: action.payload}
        case GET_YOUR_TICKETS_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: return state;
    }
}

const acceptTicketesReducer = (state={}, action) => {
    switch(action.type) {
        case ACCEPT_ORDER_REQUEST:
            return {loading: true, success: false}
        case ACCEPT_ORDER_SUCCESS:
            return {loading: false, success: true, yourticketsAfterAccept: action.payload}
        case ACCEPT_ORDER_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: return state;
    }
}
const rejectTicketesReducer = (state={}, action) => {
    switch(action.type) {
        case REJECT_ORDER_REQUEST:
            return {loading: true, success: false}
        case REJECT_ORDER_SUCCESS:
            return {loading: false, success: true, yourticketsAfterAccept: action.payload}
        case REJECT_ORDER_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: return state;
    }
}

const deliverSuccessReducer = (state={}, action) => {
    switch(action.type) {
        case DELIVER_SUCCESS_REQUEST:
            return {loading: true, success: false}
        case DELIVER_SUCCESS_SUCCESS:
            return {loading: false, success: true, yourticketsAfterAccept: action.payload}
        case DELIVER_SUCCESS_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: return state;
    }
}

const releaseTicketesReducer = (state={}, action) => {
    switch(action.type) {
        case RELEASE_ORDER_REQUEST:
            return {loading: true, success: false}
        case RELEASE_ORDER_SUCCESS:
            return {loading: false, success: true, yourticketsAfterRelease: action.payload}
        case RELEASE_ORDER_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: return state;
    }
}

const imagePathReducer = (state={}, action) => {
    switch(action.type) {
        case GET_IMAGEPATH_REQUEST:
            return {loading: true, success: false}
        case GET_IMAGEPATH_SUCCESS:
            console.log('reducer image path',action.payload)
            return {loading: false, success: true, imagePath: action.payload}
        case GET_IMAGEPATH_FAIL:
            return {loading: false, success: false, error: action.payload}
        case UPDATE_IMAGEPATH_SUCCESS:
            return {loading: false, success: true, imagePath: action.payload}
        case UPDATE_IMAGEPATH_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: return state;
    }
}

const getStatusReducer = (state={ticketsStatus:{}}, action) => {
    switch(action.type) {
        case GET_STATUS_REQUEST:
            return {loading: true, success: false, ticketsStatus:action.payload}
        case GET_STATUS_SUCCESS:
            const userOrderId = action.payload.userOrderId;
            const status = action.payload.status;
            console.log("state",state)
            console.log("state.tate.ticketsStatus[userOrderId]",state.ticketsStatus[userOrderId]);
            console.log('status', status);
            if(!state.ticketsStatus[userOrderId]||state.ticketsStatus[userOrderId]!==status) {
                console.log('inside check');
                state.ticketsStatus[userOrderId]= status
                console.log('inside state.ticketsStatus', state.ticketsStatus);
            }
               console.log("out side state.ticketsStatus",state.ticketsStatus);
            return {loading: false, success: true, william:77,ticketsStatus: state.ticketsStatus}
        case GET_STATUS_FAIL:
            return {loading: false, success: false, error: action.payload}
        default: return state;
    }
}
export {
    deliverSuccessReducer,
    imagePathReducer,
    releaseTicketesReducer,
    removeYourRejectedTicketsReducer,
    getStatusReducer,
    rejectTicketesReducer, 
    acceptTicketesReducer, 
    orderCreateReducer, 
    allOrderListReducer, 
    cartReducer,
    placeOrdersReducer, 
    getTicketsReducer, 
    getYourTicketsReducer}
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {userSigninReducer,userListReducer, userDeleteReducer, userSaveReducer, userRegisterReducer} from './Reducers/userReducer';
import { orderCreateReducer, allOrderListReducer, cartReducer, placeOrdersReducer, getTicketsReducer, getYourTicketsReducer, acceptTicketesReducer, rejectTicketesReducer, getStatusReducer, removeYourRejectedTicketsReducer, imagePathReducer, deliverSuccessReducer, deleteTicketesReducer } from './Reducers/ordersReducer';

const cartItems = Cookie.getJSON("cartItems_delivery")|| [];
const userInfo = Cookie.getJSON("userInfo") || null;
const tickets = Cookie.getJSON("getAllTickets");
const initialState = {cart:{cartItems},userSignin:{userInfo}, getTickets:{tickets}};
const reducer = combineReducers({
    usersInfo: userListReducer,
    delteUser: userDeleteReducer,
    saveUser: userSaveReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    allOrderList:allOrderListReducer,
    cart: cartReducer,
    placedOrders:placeOrdersReducer,
    getTickets: getTicketsReducer,
    getYourTickets: getYourTicketsReducer,
    acceptTickets: acceptTicketesReducer,
    rejectTickets: rejectTicketesReducer,
    getStatus: getStatusReducer,
    leftTickets: removeYourRejectedTicketsReducer,
    imagePath: imagePathReducer,
    deliverSuccess:deliverSuccessReducer,
    yourTicketsAfterDelete:deleteTicketesReducer
})
const copmposeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState,copmposeEnhancer(applyMiddleware(thunk)));

export default store;
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {getAllOrderList, getYourTickets} from '../Actions/ordersAction';
import { getYourTicketsReducer } from '../Reducers/ordersReducer';
const OrdersScreen = (props) => {
    const [stateSearch, setStateSearch] = useState('');
    const [citySearch, setCitySearch] = useState('');
    const [streetSearch, setStreetSearch] = useState('');
    const [orderNumberSearch, setOrderNumberSearch]= useState('');
    const [createdDateSearch, setCreatedDateSearch]= useState('');
    const [stateSort, setStateSort] = useState({ascending:false});
    const [stateSortClicked, setStateSortClicked] = useState(false)
    const [citySort, setCitySort] = useState({ascending:false});
    const [citySortClicked, setCitySortClicked] = useState(false)
    const [streetSort, setStreetSort] = useState({ascending:false});
    const [streetSortClicked, setStreetSortClicked] = useState(false)
    const [orderNumberSort, setOrderNumberSort]= useState({ascending:false});
    const [orderNumberSortClicked, setOrderNumberSortClicked] = useState(false)
    const [createdDateSort, setCreatedDateSort]= useState({ascending:false});
    const [createdDateSortClicked, setCreatedDateSortClicked] = useState(false)
    const [filterClass, setFilterClass] = useState('filter notShow');
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin
    const allOrders = useSelector(state => state.allOrderList);
    const {allOrderList} = allOrders;
    const cart = useSelector(state=> state.cart);
    let { cartItems } = cart;
    const takeHandler = (orderId) => {
        if(userInfo) {
            console.log("www call take handler get your tickets");
            // if(cartItems.length>0) {
            //     window.alert("You have to submit the ticket in you cart and then you can add another order in your cart");
            // }
            // else {
            // dispatch(getYourTickets(props.history, orderId));
            // }
            dispatch(getYourTickets(props.history, orderId));
        }
        else{
        props.history.push(`/signin?redirect=/orders/${orderId}`); 
        }
    }
    const filterShowHandler = () => {
      filterClass==='filter notShow' 
      ? setFilterClass('filter')
      : setFilterClass('filter notShow')
       
    }
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getAllOrderList(
            stateSearch, citySearch, streetSearch, 
            orderNumberSearch, createdDateSearch,
            stateSort,stateSortClicked, 
            citySort,citySortClicked, 
            streetSort, streetSortClicked, 
            orderNumberSort, orderNumberSortClicked, 
            createdDateSort, createdDateSortClicked));
            setStateSortClicked(false);
            setCitySortClicked(false);
            setStreetSortClicked(false);
            setOrderNumberSortClicked(false);
            setCreatedDateSortClicked(false);     
    },[stateSearch, citySearch, streetSearch, orderNumberSearch, createdDateSearch
    ,stateSort, citySort, streetSort, orderNumberSort, createdDateSort])
 
    return (
        <div className="ordersScreen">
            <h2>All Orders</h2>
            <button onClick={filterShowHandler}>Filter</button>
            <table>
                <thead>
                    <tr className={filterClass}>
                        <td>
                            <input type="text" name="state" onChange={e=>setStateSearch(e.target.value)} />
                        </td>
                        <td>
                            <input type="text" name="city" onChange={e=>setCitySearch(e.target.value)} />
                        </td>
                        <td>
                            <input type="text" name="street" onChange={e=>setStreetSearch(e.target.value)} />
                        </td>
                        <td>
                            <input type="text" name="orderNumber" onChange={e=>setOrderNumberSearch(e.target.value)} />
                        </td>
                        <td>
                          
                        </td>
                        <td>
                            <input type="text" name="createdDate" onChange={e=>setCreatedDateSearch(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <th onClick={()=>{
                            setStateSort(prev => ({ascending:!prev.ascending}));
                            setStateSortClicked(true);
                        }}>
                            State
                        </th>
                        <th onClick={()=>{
                            setCitySort(prev => ({ascending:!prev.ascending}));
                            setCitySortClicked(true);
                        }}>                           
                            City
                        </th>
                        <th onClick={()=>{
                            setStreetSort(prev => ({ascending:!prev.ascending}));
                            setStreetSortClicked(true);
                        }}>                            
                            Street
                        </th>
                        <th onClick={()=>{
                            setOrderNumberSort(prev => ({ascending:!prev.ascending}));
                            setOrderNumberSortClicked(true);
                        }}>                            
                            Order Number
                        </th>
                        <th>
                            Product
                        </th>
                        <th onClick={()=>{
                            setCreatedDateSort(prev => ({ascending:!prev.ascending}));
                            setCreatedDateSortClicked(true);
                        }}>                           
                            Created Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allOrderList&& allOrderList.map(order=>
                        order.show&&<tr key={order._id}>
                            <td>{order.state}</td>
                            <td>{order.city}</td>
                            <td>{order.street}</td>
                            <td>{order.ordernumber}</td>
                            <td>{order.product}</td>
                            <td>{order.updatedAt.substring(0,10)}</td>
                            <td>{order.show}</td>
                            <td><button onClick = {()=>{takeHandler(order._id)}}>TAKE IT</button></td>
                        </tr>
                        
                    )}
                </tbody>

            </table>
        </div>
    )
}
export default OrdersScreen;
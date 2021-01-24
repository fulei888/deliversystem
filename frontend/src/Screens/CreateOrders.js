import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ordersCreate} from '../Actions/ordersAction';
const CreateOrders = () => {

    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [ordernumber, setOrderNumber] = useState('');
    const [product, setProduct] = useState('');
    const orderCreating = useSelector(state => state.orderCreate);
    const {loading, error, orderInfo, success} = orderCreating;
    console.log("orderInfo",orderInfo);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(ordersCreate({state, city,street,ordernumber ,product}));

    }

    return (
        <div className="createOrdersForm">
            <form onSubmit ={submitHandler}> 
                <ul>
                    <li><h2>Orders Creating</h2></li>
                    <li>
                        {loading&& <div>Loading</div>}
                        {error&& <div>{error}</div>}
                        {success&& <div>Create Successfully</div>}

                    </li>
                    <li>
                        <label htmlFor="State">State</label>
                        <input type="text" name="state" value={state} onChange={(e)=> setState(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="City">City</label>
                        <input type="text" name="city" value={city} onChange={(e)=> setCity(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="Street">Street</label>
                        <input type="text" name="street" value={street} onChange={(e)=> setStreet(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="State">OrderNumber</label>
                        <input type="text" name="orderNumber" value={ordernumber} onChange={(e)=> setOrderNumber(e.target.value)} />
                    </li>

                    <li>
                        <label htmlFor="State">Product</label>
                        <input type="text" name="product" value={product} onChange={(e)=> setProduct(e.target.value)} />
                    </li>
                    <li>
                        <input type="submit" value="Submit" />
                    </li>
                </ul>
            </form>
        </div>
    )

}

export default CreateOrders;
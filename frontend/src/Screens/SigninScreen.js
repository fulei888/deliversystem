import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {signin} from '../Actions/userAction';
const SigninScreen =(props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const allYourTickets = useSelector(state => state.getYourTickets)
    const {yourtickets} = allYourTickets
    const cart = useSelector(state=> state.cart);
    let { cartItems } = cart;
    const dispatch  = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';
    useEffect(
       () => {
        if (userInfo&&yourtickets&&yourtickets[0]){
            console.log("wwww userInfo",userInfo);
            console.log("wwwww  yourtickets",yourtickets);
            const yourOrders =  yourtickets[0].ordersItems;
           
            const orderId = redirect.split("/")[2];
            console.log("orderId",orderId)
            console.log("yourOrders",yourOrders)
            const ticket = yourOrders.find(ticket=>ticket.orderId == orderId);
            console.log("www ticket", ticket);
            if(ticket && ticket.status ==="WAITING") {
                window.alert("You already have the ticket and it is waiting to check")
                props.history.push('/');
            } 
            else if (ticket && ticket.status === "REJECT") {
                window.alert("You have selected the ticket but it has been rejected")
                props.history.push('/');
            }
            else if (ticket && ticket.status == "ACCEPT") {
                window.alert("You already have the ticket and it passed the check. You can delver it now")
                props.history.push('/');
            }
            else if(cartItems.length>0){
                window.alert("You have to submit the ticket in you cart and then you can add another order in your cart");
                props.history.push("/");
            }
            else {
                props.history.push(redirect);
            }
        }
        else if (userInfo){
            props.history.push(redirect);
        }
    }, [userInfo, props.history,redirect]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    return <div className="form">
        <form onSubmit ={submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    {loading && <div>loading</div>}
                    {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name = "email" id="email" 
                    onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor = "password">Password</label>
                    <input type="password" id="password" name="password"
                    onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Sign In</button>
                </li>
                <li>
                    New to amazona?
                </li>
                <li>
                    <Link to ={redirect === "/"? "register": "register?redirect="+ redirect} className="button secondary full-width">Create your account</Link>
                </li>

            </ul>
        </form>
    </div>
}
export default SigninScreen;



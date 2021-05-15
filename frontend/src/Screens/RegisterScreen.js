import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {register} from '../Actions/userAction';
const RegisterScreen =(props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
   
    const [streetError, setStreetError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [cardNumberError, setCardNumberError] = useState(false);
  
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cardNumber, setCardNumber] = useState();
    const userRegister = useSelector(state=>state.userRegister);
    const {loading, error} = userRegister;
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    console.log("register userInfo",userInfo);
    const dispatch  = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1]:'/';
    useEffect(
       () => {
           console.log("register", userInfo);
        if (userInfo){
            props.history.push(redirect);
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password&&(password === repassword)&&street&&city&&state&&cardNumber) {
            dispatch(register(
                name, email, password,street,city,state,cardNumber));
        }
        if(password !== repassword) {
            setPasswordMatchError(true);
        }
        else {
            setPasswordMatchError(false);
        }
        if(!name) {
            setNameError(true);
        }
        else {
            setNameError(false);
        }
      
        if(!email) {
            setEmailError(true);
        }
        else {
            setEmailError(false);
        }
        if(!password) {
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
        }
        
        if(!street) {
            setStreetError(true);
        }
        else {
            setStreetError(false);
        }
        if(!city) {
            setCityError(true);
        }
        else {
            setCityError(false);
        }
      
        if(!state) {
            setStateError(true);
        }
        else {
            setStateError(false);
        }
        if(!cardNumber) {
            setCardNumberError(true);
        }
        else {
            setCardNumberError(false);
        }
    }
    return <div className="form">
        <form onSubmit ={submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Create An Account</h2>
                </li>
                <li>
                    {loading && <div>loading</div>}
                    {error && <div>{error}</div>}
                    {passwordMatchError&& <div>Passwords do not match</div>}
                    {streetError&& <div>Please fill the street field</div>}
                    {cityError&& <div>Please fill the city field</div>}
                    {stateError&& <div>Please select the state field</div>}
                    {cardNumberError&& <div>Please fill the card number field</div>}
                    {passwordError&&<div>Please fill the password field</div>}
                    {emailError&&<div>Please fill the email field</div>}
                    {nameError&&<div>Please fill the name field</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name = "name" id="name" value={name}
                    onChange={(e) => setName(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name = "email" id="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor = "password">Password</label>
                    <input type="password" id="password" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor = "repassword">Password</label>
                    <input type="password" id="repassword" name="repassword" value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor = "cardnumber">Credit/Debit Card Number</label>
                    <input type="number" id="cardnumber" name="cardnumber" value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor = "street">Street</label>
                    <input type="text" id="street" name="street" value={street}
                    onChange={(e) => setStreet(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor = "city">City</label>
                    <input type="text" id="city" name="city" value={city}
                    onChange={(e) => setCity(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor = "state">State</label>
                    {/* <input type="text" id="state" name="state"
                    onChange={(e) => setState(e.target.value)}></input> */}
                    <select id="state" name="state" value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="">--Please choose an option--</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                    </select>	
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    Already have an account? 
                    <Link to ={redirect === "/"? "signin": "signin?redirect="+ redirect} className="button secondary full-width">Sign in Your Account</Link>

                </li>
               

            </ul>
        </form>
    </div>
}
export default RegisterScreen;
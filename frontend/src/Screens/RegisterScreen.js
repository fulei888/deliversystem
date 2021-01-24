import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {register} from '../Actions/userAction';
const RegisterScreen =(props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
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
        if (password === repassword) {
            dispatch(register(name, email, password));
        }
        else {
            setPasswordError(true);
        }
    }
    return <div className="form">
        <form onSubmit ={submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Create A Account</h2>
                </li>
                <li>
                    {loading && <div>loading</div>}
                    {error && <div>{error}</div>}
                    {passwordError&& <div>Passwords do not match</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name = "name" id="name" 
                    onChange={(e) => setName(e.target.value)}>
                    </input>
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
                    <label htmlFor = "repassword">Password</label>
                    <input type="repassword" id="repassword" name="repassword"
                    onChange={(e) => setRepassword(e.target.value)}></input>
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    Already have an account? 
                    <Link to ={redirect === "/"? "signin": "signin?redirect="+ redirect} className="button secondary full-width">Create your amazona account</Link>

                </li>
               

            </ul>
        </form>
    </div>
}
export default RegisterScreen;
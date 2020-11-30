import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {registerInfo} from '../Actions/registerAction';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [points, setPoint] = useState(0);
    const dispatch = useDispatch();
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(registerInfo(name, email, phoneNumber, points));
    }
    return (
        <div className ="register_form">
            
            <form onSubmit = {submitHandler} className = "formContent">
                <ul> 
                    <li> <h4>Register Infor</h4></li>
                    <li>
                        <label>Name</label>
                        <input type="text" name = "name" onChange = {e => setName(e.target.value)} />
                        <br />
                    </li>
                    <li>
                        <label>Email</label>
                        <input type="email" name = "email" onChange = {e => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label>Phone Number</label>
                        <input type="number" name = "phone_number" onChange = {e => setPhoneNumber(e.target.value)} />
                    </li>   
                    <li>
                        <label>Total Point</label>
                        <input type="number" name = "point" onChange = {e => setPoint(e.target.value)} />
                    </li>  
                    <li>
                        <input type="submit" value="submit" />
                    </li>
                </ul>
            </form>
        </div>
    )
}
export default RegisterScreen;
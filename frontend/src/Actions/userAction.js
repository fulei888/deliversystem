import Axios from "axios";
import {  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USERLIST_REQUEST, USERLIST_SUCCESS, USERLIST_FAIL, USER_DELETE_REQUEST,USER_DELETE_SUCCESS,USER_DELETE_FAIL, USER_SAVE_SUCCESS, USER_SAVE_REQUEST, USER_SAVE_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT } from "../Constant/userConstant";
import Cookie from 'js-cookie';
import {getYourTickets} from './ordersAction';
export const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try{
        const {data} = await Axios.post("/api/user/signin", {email, password})
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        dispatch(getYourTickets());
        Cookie.set('userInfo', JSON.stringify(data), {expires: 0.1});
    }
    catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message});
    }
}

export const logout = () => async(dispatch) => {
    Cookie.remove('userInfo');
   // Cookie.remove('getTicketsStatus');
    dispatch({type:USER_LOGOUT});
}

export const usersList = () => (dispatch, getState)=>{
    console.log('iM amheree')
    const {userSignin: {userInfo}} = getState();
    dispatch ({
        type: USERLIST_REQUEST
    });
    
    Axios.get('/api/user/usersList',{
    headers: {
        Authorization: 'william '+ userInfo.token
    }})
    .then(response => {
        const {data} = response;
        console.log('data userlist',data);
        dispatch({
            type: USERLIST_SUCCESS,
            payload: JSON.stringify(data)
        })
    })
    .catch(error => {
        dispatch({
            type: USERLIST_FAIL,
            payload: error.message
        })
    })
}

export const deleteUser = (id) => (dispatch) => {
    dispatch({type: USER_DELETE_REQUEST, payload: id})
    Axios.delete('/api/user/'+id)
    .then(response => {
        const {data} = response.data;
        dispatch({type: USER_DELETE_SUCCESS, payload:data})
    })
    .catch(error => {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.message
        })
    })
}

export const saveUser = (user) => (dispatch, getState) => {
    const {userSignin: {userInfo}} = getState();
    dispatch({type: USER_SAVE_REQUEST})
    Axios.put('/api/user/'+user._id, user,
    {
        headers: {
            Authorization: 'william ' + userInfo.token
        }
    })
    .then(response => {
        const {data} = response.data;
        console.log('response',response);
        dispatch({type: USER_SAVE_SUCCESS, payload:data})
    })
    .catch(error => {
        dispatch({
            type: USER_SAVE_FAIL,
            payload: error.message
        })
    })
}

export const register = (name, email, password,street,city,state,cardNumber) => async dispatch => {
    console.log("comming");
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password,street,city,state,cardNumber}});
    try{
        const {data} = await Axios.post("/api/user/register", {name, email, password,street,city,state,cardNumber})
        console.log("action data", data);
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch(signin(email,password));
       
    } catch (error) {
        console.log('errror', error.message);
        dispatch({type: USER_REGISTER_FAIL, payload: error.message});
    }
}
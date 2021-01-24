import {  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USERLIST_REQUEST, USERLIST_SUCCESS, USERLIST_FAIL, USER_DELETE_REQUEST,USER_DELETE_SUCCESS,USER_DELETE_FAIL, USER_SAVE_REQUEST, USER_SAVE_SUCCESS, USER_SAVE_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT} from "../Constant/userConstant"

const userSigninReducer = (state={}, action) =>{
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        case USER_LOGOUT:
            return {}
        default: return state;
    }
}

const userListReducer = (state={}, action) => {
    switch (action.type) {
        case USERLIST_REQUEST: 
            return {loading: true}
        case USERLIST_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USERLIST_FAIL:
            return {loading: false, error: action.payload}
        default: return state
    }
}

const userDeleteReducer = (state={}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST: 
            return {loading: true, success: false}
        case USER_DELETE_SUCCESS:
            return {loading: false, deletedUser: action.payload, success: true}
        case USER_DELETE_FAIL:
            return {loading: false, error: action.payload, success: false}
        default: return state
    }
}
const userSaveReducer = (state={}, action) => {
    switch (action.type) {
        case USER_SAVE_REQUEST: 
            return {loading: true, success: false}
        case USER_SAVE_SUCCESS:
            return {loading: false, saveUser: action.payload, success: true}
        case USER_SAVE_FAIL:
            return {loading: false, error: action.payload, success: false}
        case USER_LOGOUT:
            return {}
            default: return state
    }
}
const userRegisterReducer = (state={}, action) =>{
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        default: return state;
    }
}
export {userListReducer, userDeleteReducer, userSaveReducer,userSigninReducer, userRegisterReducer}
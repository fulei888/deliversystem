import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {registerReducer} from './Reducers/registerReducer';
const initialState = {};
const reducer = combineReducers({
    registerInfo: registerReducer
})
const copmposeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState,copmposeEnhancer(applyMiddleware(thunk)));

export default store;
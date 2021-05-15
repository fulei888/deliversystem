import logo from './logo.svg';
import './App.css';
import PayDeliveryScreen from './Screens/PayDelivery';
import RegisterScreen from './Screens/RegisterScreen';
import DataScreen from './Screens/DataScreen';
import SigninScreen from './Screens/SigninScreen';
import CreateOrders from './Screens/CreateOrders';
import OrdersScreen from './Screens/OrdersScreen';
import CartScreen from './Screens/CartScreen';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter, Link, Route, Router, Switch} from 'react-router-dom';
import {logout} from './Actions/userAction';
import RequestTickestsScreen from './Screens/RequestTicketsScreen';
import YourTicketsScreen from './Screens/YourTicketsScreen';
import UploadImageScreen from './Screens/UploadImageScreen';
import { useEffect, useState } from 'react';
import PersonalPofile from './Screens/PersonalPofile';
import ModalDropOff from './Components/ModalDropOff/ModalDropOff';
import SideDrawer from './Components/SideDrawer';
function App(props) {
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  console.log('userInfo',userInfo);
  const dispatch = useDispatch();
  const [showing, setShowing] = useState(false);
  const logoutHandler = () => {
    //props.history.push("/signin");
    console.log("logoutHandler",props);
    dispatch(logout());
  }
  useEffect(()=>{
    
  },[])
  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
    setShowing(true);
  }
  const closeModalHandler = () => {
    setShowing(false);
    document.querySelector('.sidebar').classList.remove('open');
  }
  const logoutAndCloseModal = () => {
    closeModalHandler();
    logoutHandler();
  }
  return (
    <BrowserRouter>
    <div className="App">
   
      <div className="grid-container">
        <header className ="header">

        <button onClick={openMenu} className="sideDrawerButton">
              &#9776;
        </button>
        
          <div className = "brand">
          <Link to ="/" className="logoName">Delivery System</Link>
          </div>
          <div className = "header-links">
          {userInfo&& userInfo.token &&
           <Link to = "/" className="home">Home</Link>}
            &nbsp;&nbsp;&nbsp;&nbsp;
          {userInfo && userInfo.token &&
            <Link to = "/cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart</Link>}
            &nbsp;&nbsp;&nbsp;&nbsp;

        <span className="userName">
              {userInfo && userInfo.token?  userInfo&&userInfo.isAdmin?
              <span className="dropdown">
              <Link to="/profile">Admin</Link>
            <ul className="dropdown-content">
                <li><Link to = "/tickets">Requested Tickets</Link></li>
                <li><Link to = "/data">Users Management</Link></li>
                <li><Link to ="/createorders">Create Orders</Link></li>
                <li><Link to ="/paydelivery">Pay Delivery</Link></li>
                <li onClick = {logoutHandler}><Link to="/signin">Logout</Link></li>
            </ul>
            </span>
              :<span className="dropdown">
                <Link to="/profile">{userInfo.name}</Link>
              <ul className="dropdown-content">
              <li><Link to="/yourtickets">Your Tickets</Link></li>
                <li onClick = {logoutHandler}><Link to="/signin">Logout</Link></li>
              </ul>
              </span>
                :<Link to="/signin" >Sign In</Link>
              }
          </span>
          </div>
        <SideDrawer showing={showing} closeModalHandler={closeModalHandler}>
          <ul> 
              <li><Link to = "/">Home</Link></li>
                {userInfo && userInfo.token?  
                  userInfo&&userInfo.isAdmin?
                    <span>
                        <Link to="/profile">Admin</Link>
                        <ul className="dropdown-content">
                            <li><Link to = "/tickets">Requested Tickets</Link></li>
                            <li><Link to = "/data">Users Management</Link></li>
                            <li><Link to ="/createorders">Create Orders</Link></li>
                            <li><Link to ="/paydelivery">Pay Delivery</Link></li>
                            <li onClick = {logoutHandler}><Link to="/signin">Logout</Link></li>
                        </ul>
                    </span>
                    :<>
                        <li><Link to="/profile" onClick={closeModalHandler}>{userInfo.name}</Link></li>
                        <li><Link to="/yourtickets" onClick={closeModalHandler}>Your Tickets</Link></li>
                        <li onClick = {logoutAndCloseModal}><Link to="/signin">Logout</Link></li>
                     </> 
                    
                  :<li><Link to="/signin" onClick={closeModalHandler}>Sign In</Link></li>
                  }
            </ul>
       </SideDrawer>
        </header>
       
        <main className="main">
          <Switch>
          <Route path="/profile" exact component={PersonalPofile} />
          <Route path="/paydelivery" exact component={PayDeliveryScreen} />
          <Route path="/uploadimage/:id" exact component={UploadImageScreen} />
          <Route path="/yourtickets" exact component={YourTicketsScreen} />
          <Route path="/tickets" exact component={RequestTickestsScreen} />
          <Route path="/signin" exact component={SigninScreen} />
          <Route path="/cart"  component={CartScreen} />
          <Route path="/orders/:id"  component={CartScreen} />
          <Route path="/createorders" exact component={CreateOrders} />
          <Route path="/register" exact component={RegisterScreen} />
          <Route path ="/data" component={DataScreen} />
          <Route path="/" exact component={OrdersScreen} />
          </Switch>
        </main>
        <footer className="footer">
          William copy right
        </footer>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;

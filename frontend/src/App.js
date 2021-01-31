import logo from './logo.svg';
import './App.css';
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
function App(props) {
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  console.log('userInfo',userInfo);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    //props.history.push("/signin");
    console.log("logoutHandler",props);
    dispatch(logout());
  }
  return (
    <BrowserRouter>
    <div className="App">
      <div className="grid-container">
        <header className ="header">
          <div className = "brand">
          <Link to ="/">Delivery System</Link>
          </div>
          <div className = "header-links">
          {userInfo&&
           <Link to = "/">Home</Link>}
            &nbsp;&nbsp;&nbsp;&nbsp;
          {userInfo &&
            <Link to = "/cart">Cart</Link>}
            &nbsp;&nbsp;&nbsp;&nbsp;

          {userInfo?  userInfo&&userInfo.isAdmin?
          <span className="dropdown">
          <Link to="/profile">Admin</Link>
        <ul className="dropdown-content">
            <li><Link to = "/tickets">Requested Tickets</Link></li>
            <li><Link to = "/data">Users Management</Link></li>
            <li><Link to ="/createorders">Create Orders</Link></li>
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
            :<Link to="/signin">Sign In</Link>
          }
          </div>
        </header>
        <main className="main">
          <Switch>
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

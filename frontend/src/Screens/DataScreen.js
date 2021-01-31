import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {usersList, deleteUser, saveUser} from '../Actions/userAction';

const DataScreen = React.memo(() => {
    const inforUsers= useSelector(state => state.usersInfo);
    const {error, loading, userInfo} = inforUsers;
    const successDelete = useSelector(state => state.delteUser);
    const {success: deleteSuccess} = successDelete;
    const userSave = useSelector(state => state.saveUser);
    const {success: saveSuccess, error: saveError, loading: saveLoading} = userSave;
    const [name, setName] = useState('');
    const [password,setPassword] = useState();
    const [email, setEmail] = useState();
    const [points, setPoints] = useState();
    const [modalVisable, setModalVisable] = useState(false);
    const [_id, setId] = useState();
   
    
    const dispatch = useDispatch();
    useEffect(()=> {
        console.log("userSave",userSave.success);
        console.log('deleteSucces',deleteSuccess);
        // if (saveSuccess) {
        //     setModalVisable(false);
        //   }
        dispatch(usersList());
       
    },[deleteSuccess, saveSuccess])
        
   const openModal = (user) => {
       setModalVisable(true);
       setName(user.name);
       setPassword(user.password);
       setEmail(user.email);
       setId(user._id)
   }
    const deletHandler = (user) => {
        // if(window.confirm('Are you sure?')) {
        //     dispatch(deleteUser(user._id));
        // }
        dispatch(deleteUser(user._id));
    }
    const submitHanlder = (event) => {
        console.log('submit');
        event.preventDefault();
        dispatch(
            saveUser({
                name,
                password,
                email,
                _id
            }
            )
        )
    }
    
    return (
        <div className="product-list">
            <h2>All Users</h2>
            <div className="editForm">
                {modalVisable && 
                <form onSubmit ={submitHanlder}>
                    <div >
                        <ul>
                            <li>
                                <h2>Edit Info</h2>
                            </li>
                            <li>
                                {saveSuccess && <div> Save Success</div>}
                                {saveLoading && <div>Loading</div>}
                                {saveError && <div>{saveError}</div>}
                               
                            </li>
                            <li>
                                <label htmlFor="name">Name</label>
                                <input
                                type="text"
                                name="name"
                                value={name}
                                onChange = {e=>setName(e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor="email">Email</label>
                                <input
                                type="email"
                                name="email"
                                value={email}
                                onChange = {e=>setEmail(e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor="password">password</label>
                                <input
                                type="text"
                                name="phonenumber"
                                value={password}
                                onChange = {e=>setPassword(e.target.value)}
                                />
                            </li>
                            
                            <li>
                                <button type="submit" className="button primary"
                                >Submit</button>
                                <button type="button" className="back button primary" onClick={()=> {setModalVisable(false)}}
                                >Back</button>
                            </li>
                        </ul>
                    </div>
                </form> 
                }
            </div>
           
          {!userInfo&& <p> Loading </p>}
          {userInfo &&
          <table className="table">
              <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>password</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                 {JSON.parse(userInfo).map((user) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.updatedAt}</td>
                        <td>
                        <button onClick={()=>openModal(user)}>Edit</button>
                        <button onClick={()=>deletHandler(user)}>Delete</button>
                        </td>
                    </tr>
                   
                ))}
            </tbody>
           
          </table>
        }
        </div>
    )
},
)
export default DataScreen;
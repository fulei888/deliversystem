import React, {useState, useEffect, Fragment}from 'react';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {getImagePath,updateImagePath,deliverSuccess} from '../Actions/ordersAction';



const UploadImageScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const getDeliverSuccess = useSelector(state => state.deliverSuccess);
    const {success:successDeliver} = getDeliverSuccess;
    console.log('successDeliver',successDeliver);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const [image, setImage] = useState('');
    console.log('props.location.search',props.match.params.id);
    console.log("image", image);
    const getImagepath = useSelector(state => state.imagePath);
    const {imagePath, success, loading} = getImagepath;
    console.log('imagePath',imagePath);
    const[count,setCount] = useState(1);
    const orderId = props.match.params.id;
    const deliverSuccessHandler = () => {
        dispatch(deliverSuccess(orderId));
    }
    const dispatch = useDispatch()
    useEffect(()=>
        {
        if(count===1) {
            dispatch(getImagePath(orderId,setImage))
        }
        if(imagePath&&success) {
            setImage(imagePath);
        }
        else if (!imagePath&&success) {
            setImage('/uploads/default.jpg')
        }
        setCount(count=>count+1);
    }
    ,[success])
    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        Axios.post('/api/uploads', bodyFormData, {
            headers: {'Content-Type': 'multipart/form-data',
            Authorization: `william ${userInfo.token}`,
        }
        })
        .then(
            response => {
                const {data} = response;
                setImage(data);
                dispatch(updateImagePath(orderId,data))
                setLoadingUpload(false);
            }
        )
        .catch(error => {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }  
        )  
    }

    return (
       <Fragment>
            {successDeliver&&<div>Your photo get sent to the server successfully</div>}
        {!image?<div>Loading</div>: <div><img src={image} alt="delivered photo" />
            <label htmlFor ="imageFile">Image File</label>
            <input
                type ="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
                />
                {loadingUpload && <div>Loading</div>}
                {errorUpload && <div>error upload</div>}
                <button onClick={deliverSuccessHandler}>Delivered Successfully</button>
            </div>
        }
        </Fragment>
            
    )
}
export default UploadImageScreen;
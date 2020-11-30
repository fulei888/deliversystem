import Axios from "axios";
import { REGISTER_INFO_SUCCESS, REGISTER_INFO_FAIL, REGISTER_INFO_REQUEST } from "../Constant/resgisterConstant";
export const registerInfo = (name, email, phonenumber, points) => async (dispatch) => {
    dispatch ({
        type: REGISTER_INFO_REQUEST
    });
    try {
        console.log(name, email, phonenumber, points);
        const {data} = Axios.post('/api/users/register', {name, email, phonenumber, points});
        dispatch  ({
            type: REGISTER_INFO_SUCCESS, payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: REGISTER_INFO_FAIL, payload: error.message
        })
    }
}
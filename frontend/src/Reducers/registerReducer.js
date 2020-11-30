import { REGISTER_INFO_SUCCESS, REGISTER_INFO_FAIL, REGISTER_INFO_REQUEST } from "../Constant/resgisterConstant";

const registerReducer = (state={}, action) => {
    switch (action.type) {
        case REGISTER_INFO_REQUEST:
            return {loading:true}
        case REGISTER_INFO_SUCCESS:
            return {loading:false, registerInfo: action.payload}
        case REGISTER_INFO_FAIL:
            return {loading:false, error: action.payload}
        default: return {state}
    }
}
export {registerReducer}
import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
    state: {type: String, required: true},
    city: {type:String, required: true},
    street: {type:String, required: true},
    ordernumber: {type: String, required: true},
    product: {type:String, required: true},
    show: {type: Boolean, default:true}
},
{
    timestamps: true
}
);
const ordersModel = mongoose.model("Orders", ordersSchema);
export default ordersModel;
import mongoose from 'mongoose';
const ordersSchema = new mongoose.Schema({
    orderId:{type:mongoose.Schema.Types.ObjectId,
        ref:'Orders', required: true},
    state: {type: String, required: true},
    city: {type:String, required: true},
    street: {type:String, required: true},
    ordernumber: {type: String, required: true},
    product: {type:String, required: true},
    date:{type:String, required: true},
    status:{type:String, default:'WAITING'},
    show: {type: Boolean },
    imagePath: {type:String}
}
);

const personalOrdersSchema = new mongoose.Schema({
   ordersItems:[ordersSchema],
    userId: {type:mongoose.Schema.Types.ObjectId,
    ref:'Users', required:true, unique: true, dropDups: true }
   
},
{
    timestamps: true
}
);
const personalOrdersModel = mongoose.model("personalOrders", personalOrdersSchema);
export default personalOrdersModel;
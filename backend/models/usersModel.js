import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  cardNumber: { type: Number, required: true}
},
{
    timestamps: true
}

);

const usersModel = mongoose.model("Users", usersSchema);

export default usersModel;
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
const userRouter = express.Router();

userRouter.get('/seed', (req, res) => {
    res.send("I love you baby!")
})

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        points: req.body.points
    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            name: newUser.name,
            email: newUser.email,
            phonenumber: newUser.phonenumber,
            points: newUser.points
        })
    }
    else {
        res.status(401).send({msg: 'Invalid User Data.'})
    }
    
}))
export default userRouter;
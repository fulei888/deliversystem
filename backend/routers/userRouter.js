import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Users from '../models/usersModel.js';
import { getToken, isAuth, isAdmin } from '../util.js';
const userRouter = express.Router();
userRouter.get("/createadmin", expressAsyncHandler(async(req,res)=> {
    try {
      const user = new Users({
        name: 'william',
        email: 'william@gmail.com',
        password: bcrypt.hashSync('password',8),
        isAdmin:true
      });
      const newUser = await user.save();
      res.send(newUser);
    } 
    catch (error) {
      res.send({msg: error.message})
    }
  })
)
userRouter.get('/seed', (req, res) => {
    res.send("I love you baby!")
})
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
const signinUser = await Users.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    })

  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }
}))
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser)
      })
    } else {
      res.status(401).send({ msg: 'Invalid User Data.' });
    }
  
  }))
userRouter.get('/usersList', isAuth, isAdmin,expressAsyncHandler(async (req, res) => {
  console.log('userlist');  
  const users = await Users.find();
    res.send(users);
}
))
userRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    const deletedUser = await Users.findById(req.params.id);
    if (deletedUser) {
        await deletedUser.remove();
        res.send({message: "Product Delete"});
    }
    else {
        res.send('Error in Deletion');
    }
}
))

userRouter.put('/:id', isAuth, expressAsyncHandler(async(req, res) => {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updateUser = await user.save();
        res.send({
            _id: updateUser.id,
            name: updateUser.name,
            email: updateUser.email,
            points: updateUser.points
        })
    }
    else {
        res.status(404).send({msg: 'User Not Found'});
    }
}))
export default userRouter;
import jwt from 'jsonwebtoken';
import config from './config.js';
const getToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    street: user.street,
    city: user.city,
    state: user.state,
    cardNumber: user.cardNumber

  }, config.JWT_SECRET, {
    expiresIn: '48h'
  })
}

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('req.headers',req.headers);
  console.log('token',token);
  if (token) { 
    const onlyToken = token.split(' ')[1];
    console.log('onlytoken',onlyToken);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return
    });
  } else {
    return res.status(401).send({ msg: "Token is not supplied." });
  }
}

const isAdmin = (req, res, next) => {
  
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: 'Admin Token is not valid.' })
}

export {
  getToken, isAuth, isAdmin
}
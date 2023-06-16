const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const signUp = (req, res, next) => {
bcrypt.hash(req.body.Password, 10)
.then(hash => {
  const user = new User({
    Fullname : req.body.Fullname,
    Username : req.body.Username,
    Password : hash
  });
  console.log(user)
  user.save()
  .then(() => res.status(201).json({message: 'User Created!'}))
  .catch(error => res.status(400).json({error}));
})
.catch(error => res.status(500).json({error}))
}

const logIn = async (req, res, next) => {
  User.findOne({Username : req.body.Username})
  .then(user => {
    if(user === null) {
      res.status(401).json({message : 'username or password incorrect'})
      }
      else{
        bcrypt.compare(req.body.Password, user.Password)
        .then( valid => 
          {
          if(valid)
          {
            const userId = user._id ;
            const Fullname = user.Fullname 
             const RSA_PRIVATE_KEY = 'RANDOM_TOKEN_SECRET';
     
             var tokenData = jwt.sign({ id: userId },
              RSA_PRIVATE_KEY,
             {expiresIn: 1000  } 
             );
            return res.status(200).send({ token : tokenData, Fullname: Fullname });
          } 
          else
          { 
            return res.status(401).json({message : 'username or password incorrect'})
          }
        })
        .catch(error => res.status(500).json({message: 'no password'}))  
      }
  })
  .catch(error => 
    res.status(500).json({message: 'nothing'}))
}



module.exports = {signUp, logIn}
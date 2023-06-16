const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

var router = express.Router();




router.get('/', function(req, res) {
     const RSA_PRIVATE_KEY = 'RANDOM_TOKEN_SECRET';

    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, RSA_PRIVATE_KEY, function(err, data)
    {
       let userid = data.id;
       let user = User.findById(userid)
        if (user)
        {
        return res.status(200).send(userid);
        }
        else
        {
        return res.status(500).send({ auth: false, alert: 'Failed to authenticate token.' });
      }
    });

  });

  module.exports = router;

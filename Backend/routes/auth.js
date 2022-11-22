// const { default: userEvent } = require('@testing-library/user-event');
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "IamHero123";


router.post('/createuser',[
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user = await User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(400).json({error: "A user with this email already exist"});
    }

    const salt =await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    });
    const data = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json(authtoken);
}catch(error){
    console.error(error.message);
    res.status(500).send("Some Error occured");
}
},
);

module.exports = router;
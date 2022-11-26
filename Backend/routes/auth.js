// const { default: userEvent } = require('@testing-library/user-event');
require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.SECRET;


router.post('/createuser',[
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
],
async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try{
    let user = await User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(400).json({success, error: "A user with this email already exist"});
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
    success = true;
    res.json({success,authtoken});
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error");
}
},
);

// Authenticate a user
router.post('/login',[
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
],
async (req,res)=> {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };

    const {email,password} = req.body;
    try{
        let user =await User.findOne({email});
        if (!user) {
            return res.status(400).json({ errors:"Please try to login with correct credentials"});
          };

          const passwordCompare =await bcrypt.compare(password,user.password);
          if (!passwordCompare) {
            success=false;
            return res.status(400).json({success, errors:"Please try to login with correct credentials"});
          };

          const data = {
            user: {
                id: user.id
            }
          }

          const authtoken = jwt.sign(data,JWT_SECRET);
          success=true;
          res.json({success,authtoken});
    }catch(error){
        console.error(error.message);
    res.status(500).send("Internal server Error");
    }
});

//Get loggedIn user Details using POST: Login Required
router.post('/getuser',fetchuser,
async (req,res)=> {
try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error");
}
});

module.exports = router;
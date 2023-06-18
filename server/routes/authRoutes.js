// authRoutes.js
const mongoose = require('mongoose');
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config');



const User = mongoose.model("users");

const router = express.Router();

router.post("/register", async(req, res) => {
    const {firstName, lastName, email, password} = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({email});
    if (oldUser){
      return res.send({error:"User Exists"})
    }

    await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    res.send({status:"ok"})
  } catch (error) {
    res.send({status:"error"})
  }
});

router.post("/login-user", async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user){
        return res.send({error:"User not found"})
    }
    if (await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email:user.email}, JWT_SECRET);
        if (res.status(201)){
        return res.json({status:"ok", data:token});
        }else{
        return res.json({error: "error"})
        }
    }
    res.json({status:"error", error:"Incorrect Password"})
});

router.post("/userData", async(req,res) => {
    const{token} = req.body;

    try {

        const user = jwt.verify(token, JWT_SECRET);

        const useremail = user.email;
        
        User.findOne({email:useremail }).then((data)=>{
        res.send({status: "ok", data: data})
        }).catch((error) => {
        res.send({status: "error", data: data})
        });
        
    } catch (error) {
        
    }
});

module.exports = router;
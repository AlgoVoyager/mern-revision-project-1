const User = require('../models/User');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

export const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if(!email || !password) return res.status(400).json({message:"Insufficient Data!"}) 
        const normalizedEmail  = email.trim().toLowerCase();
        let user = await User.findOne({email:normalizedEmail});
        if(user) return res.status(409).json({message:"Email already used by another user!"})
        const hashed = await bcrypt.hash(password,10);
        const newUser ={
            email:normalizedEmail,
            password: hashed,
        }
        if(name) newUser.name = name;
        const {password: _, ...safeUser} = user.toObject();
        return res.status(201).json({message:"User created succesfully!", safeUser});
    } catch (error) {
        if(error.code===11000)
            return res.status(409).json({message:"Email already registered"})
        return res.status(500).json({message:"Internal server error"})
    }
}
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if(!user) return res.status(404).json({message:"User not found"})
        const {password, ...userDetails} = user.toObject();
        return res.status(200).json({user:userDetails});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}
const signup = async (req, res) => {
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
        const createdUser = await User.create(newUser);  
        const {password: _, ...safeUser} = createdUser.toObject();
        return res.status(201).json({message:"User created succesfully!"});
    } catch (error) {
        console.log(error)
        if(error.code===11000)
            return res.status(409).json({message:"Email already registered"})
        return res.status(500).json({message:"Internal server error"})
    }
}
const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const normalizedEmail  = email.trim().toLowerCase();
        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const match = await bcrypt.compare(password,user.password);
        if (!match) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );
        return res.status(200).json({message:"Login succesfull", token})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}
module.exports = {
    getUserById,
    signup,
    login
}
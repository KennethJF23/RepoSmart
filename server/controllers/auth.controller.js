const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/users.models");


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"});
}

exports.register = async (req,res) => {
    try{
        const [username,email,password] = req.body;

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:"User already exist"});
        }

        const hashPassword = bcrypt.hash(password,10);
        
        const user = User.create({
            username,
            email,
            password:hashPassword
        })

        res.status(201).json({
            id:user._id,
            username:user.username,
            email:user.email,
            password:user.password,
            token:generateToken(user.id)
        })

    }catch(err){
        res.status(500).json({message:err.message});
    }
};


exports.login = async (req,res) => {
    try{
        const [email,password] = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credential or Create User"});
        }

        const IsMatch = await bcrypt.compare(password,user.password);

        if(!IsMatch){
            return res.status(400).json({message:"Invalid Password"});
        }

        res.json({
            id:user._id,
            username:user.username,
            email:user.email,
            token:generateToken(user.id)
        });

    }catch(err){
        res.status(500).json({message:err.message});
    }
};
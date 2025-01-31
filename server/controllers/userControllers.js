const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")



const registerController = async(req,res) => {
    try{
        const existingUser = await userModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({message:'User already exists' , success:false});
        }

        //password
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        //replace password with hashed password
        req.body.password = hashedPassword;

        //new user
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({success:true , message:'User Registered successfully'});
    }
    catch(error){
        console.log(`Error in registerController ${error}`.bgRed.white);
        res.status(500).send({success:false , message:`registerController error ${error.message}`});
    }
}

const loginController = async (req , res) => {
    try{
        const user = await userModel.findOne({email : req.body.email})

        if(!user){
            return res.status(200).send({message:`user not found` , success:false});
        }

        //filter for comparing password and decrypt the password

        const password = await bcrypt.compare(req.body.password , user.password);
        if(!password){
            return res.status(200).send({message:`Email or Password is wrong` , success:false});
        }

        //if there is user and password then generate the token  for user to secure our app
        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).send({message:"Login Successfully" , success:true , token : token});



    }catch(error){
        console.log(error);
        res.status(500).send({message : `Error in login controller ${error.message}`});
    }
}
module.exports = {loginController,registerController};
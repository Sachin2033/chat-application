import User from '../models/user.model.js'
import bcrypt from 'bcryptjs' ;
import generateTokenSetCookie from '../utils/generateToken.js';

export const signup = async (req , res) => {
    try{
        const {fullName , username , password , gender} = req.body ;

        
        const user = await User.findOne({username}) ;
        if(user) {
            return res.status(400).json({error: "Username already Exists"}) ;
        }

        // hash password here 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // https://avatar.placeholder.iran.liara.run/avatar/200/200/any
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl`;

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic:girlProfilePic 
        });
        if(newUser){
            //generate jwt token :======>>>> 
            await generateTokenSetCookie(newUser._id , res) ;
            await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName : newUser.fullName,
            username : newUser.username,
            profilePic: newUser.profilePic
        });
        }else{
            res.status(400).json({error:"Invalid user data"}) ;
        }
    }catch(  error  ){
        console.log("Error in Signup Controller" , error.message);
        res.status(500).json({error:"Internal server error"});
    }
};

export const login = async (req , res) => {
    try{
        const { username , password } = req.body ;
        const user  = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "") ;

        if(!user|| !isPasswordCorrect) {
            return res.status(400).json({error:"INVALID USERNAME OR PASSWORD !!!!!"});
        }

        generateTokenSetCookie(user._id , res);
        // console.log("Welcome in system!!!!");
        res.status(200).json({
            _id: user._id,
            fullName : user.fullName,
            username : user.username,
            profilePic: user.profilePic
        })

    }catch(error){
        console.log("Error in Login Controller" , error.message);
        res.status(500).json({error:"Internal server Error"});
    }
};

export const logout = (req , res) => {
    try{

        res.cookie("jwt" ,"" , {maxAge : 0});
        res.status(500).json({message: "Logged out Successfully -__-"})

    }catch(error){
        console.log("Error in Logout Controller" , error.message);
        res.status(500).json({error:"Internal server Error"});
    }
};

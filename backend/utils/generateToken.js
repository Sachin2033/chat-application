import jwt from 'jsonwebtoken';

const generateTokenSetCookie = (userId , res) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET, {
        expiresIn:'15d'
    })

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true, // cannot be accessed by js
        sameSite:"strict" // cross site req. forgery attacks

    });
}
export default generateTokenSetCookie ;
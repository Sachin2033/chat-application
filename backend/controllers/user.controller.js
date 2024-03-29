import User from "../models/user.model.js";
export const getUserForSidebar = async (req , res) => {
    try {
        
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id : { $ne : loggedInUserId}}).select("-password"); // => if we add this part in parenthesis then we cannot fin ourself among other users 

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in user Controller" , error.message);
        res.status(500).json({error:"Internal server Error"});
    }
}
import { getAuth } from "@clerk/express";
import { User } from "../model/user.model.js";


export const getUserData = async (req ,res) => {
    try {
        const { userId } = getAuth(req);
        const user = await User.findById(userId);
        if(!user){
           return res.json({success : false , message : "User not found..."})
        }

        res.json({success : true , user})

    } catch (error) {
        return res.json({success : false , message : error.message})
    }
}

export const userEnrolledCourses = async (req , res) => {
    try {
        
        const { userId } = getAuth(req);
        const userData = await User.findById(userId).populate('enrolledCourses');

         res.json({success : true , enrolledCourses : userData.enrolledCourses})

    } catch (error) {
         res.json({success : false ,  message : error.message})
    }
}

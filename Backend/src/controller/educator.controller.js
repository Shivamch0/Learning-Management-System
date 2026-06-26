import { clerkClient, getAuth } from "@clerk/express";
import { Course } from "../model/course.model.js";
import { v2 as cloudinary } from "cloudinary";

export const updateRoleEducator = async (req, res) => {
  console.log(req.auth.userId);
  console.log(req.auth);
  console.log(req.headers.authorization);
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });
    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addCourse = async (req , res) => {
    try {
        
        const {courseData} = req.body;
        const imageFile = req.file;
        const {userId} = getAuth(req);

        if(!imageFile){
            return res.json({success : false , message : "Thumbnail Not Attached"})
        }

        const parsedCourseData = await JSON.parse(courseData);
        parsedCourseData.educator = educatorId;

        const newCourse = await Course.create(parsedCourseData);
        const imageUpload = await cloudinary.uploader.upload(imageFile.path);
        newCourse.courseThumbnail = imageUpload.secure_url;
        await newCourse.save();

        res.json({success : true , message : "Course Added"})


    } catch (error) {
        res.json({success : false , message : error.message})
    }
}

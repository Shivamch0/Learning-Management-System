import mongoose , { Schema , type InferSchemaType} from "mongoose";

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    name : {type : String , required : true},
    email : {type : String , required : true},
    imageUrl : {type : String , required : true},
    enrolledCourses : [
        {
            type: Schema.Types.ObjectId,
            ref : 'Course'
        }
    ],
    
} , { timestamps : true});

export type UserType = InferSchemaType<typeof userSchema>

export const User = mongoose.model("User" , userSchema)
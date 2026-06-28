import mongoose , {Schema , type InferSchemaType} from "mongoose";

const purchaseSchema = new Schema({
    courseId : {type : mongoose.Schema.Types.ObjectId , ref : "Course" , required : true},
    userId : {type : String, ref : "User" , required : true},
    amount : {type : Number , required : true},
    status : {type : String , enum : ['pending' , 'completed' , 'failed'] , default : 'pending'},
} , {timestamps : true});

export type PurchaseType = InferSchemaType<typeof purchaseSchema>

export const Purchase = mongoose.model("Purchase", purchaseSchema)

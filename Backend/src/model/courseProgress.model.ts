import mongoose , {Schema , type InferSchemaType} from "mongoose";

const courseProgressSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    lectureCompleted: [],
  },
  {
    minimize: false,
  }
);

export type CourseProgressType = InferSchemaType<typeof courseProgressSchema>

export const CourseProgress = mongoose.model(
  "CourseProgress",
  courseProgressSchema
);
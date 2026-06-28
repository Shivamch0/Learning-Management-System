export type Lecture = {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
};

export type Chapter = {
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  chapterContent: Lecture[];
};

export type Course = {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  courseThumbnail?: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseContent: Chapter[];
  courseRatings: {userId: string; rating: number}[];
  educator: User;
  enrolledStudents: string[];
  createdAt?: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
  enrolledCourses: string[];
};

export type CourseProgress = {
  _id?: string;
  userId: string;
  courseId: string;
  completed: boolean;
  lectureCompleted: string[];
};

export type ProgressSummary = {
  totalLectures: number;
  lectureCompleted: number;
};

export type DashboardData = {
  totalEarnings: number;
  totalCourses: number;
  enrolledStudentsData: {
    courseTitle: string;
    student: Pick<User, "_id" | "name" | "imageUrl">;
  }[];
};

export type EnrolledStudent = {
  student: Pick<User, "_id" | "name" | "imageUrl">;
  courseTitle: string;
  purchaseDate: string;
};

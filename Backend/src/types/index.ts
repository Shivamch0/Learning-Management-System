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
  courseThumbnail: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseContent: Chapter[];
  courseRatings: {userId: string; rating: number}[];
  educator: User | string;
  getEnrolledStudents: string;
};

export type User = {
    _id : string;
    name : string;
    email : string;
    imageUrl : string;
    erolledStudents : Course[];
}
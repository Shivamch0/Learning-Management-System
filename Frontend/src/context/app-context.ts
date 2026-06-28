import { createContext, type Dispatch, type SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { Chapter, Course, User } from "../types";

export type AppContextValue = {
  currency: string;
  allCourses: Course[];
  navigate: NavigateFunction;
  isEducator: boolean;
  setIsEducator: Dispatch<SetStateAction<boolean>>;
  enrolledCourses: Course[];
  userData: User | null;
  setUserData: Dispatch<SetStateAction<User | null>>;
  backendUrl: string;
  calculateRating: (course: Course) => number;
  calculateChapterTime: (chapter: Chapter) => string;
  calculateCourseDuration: (course: Course) => string;
  calculateNoOfLectures: (course: Course) => number;
  fetchUserEnrolledCourses: () => Promise<void>;
  fetchAllCourses: () => Promise<void>;
  getToken: () => Promise<string | null>;
};

export const AppContext = createContext<AppContextValue | null>(null);

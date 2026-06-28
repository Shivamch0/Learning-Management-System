import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import type { NavigateFunction } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { Chapter, Course, User } from "../types";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/react";
import axios from "axios";
import { toast } from "react-toastify";

type AppContextValue = {
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

export const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context) throw new Error("useAppContext must be used inside AppProvider");
  return context;
}

type AppProviderProps = {
  children: ReactNode;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

export const AppProvider = ({ children }: AppProviderProps) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [userData, setUserData] = useState<User | null>(null);

  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all");

      if (data.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const fetchUserData = async () => {
    if (user.publicMetadata.role === "educator") {
      setIsEducator(true);
    }

    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + "/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const calculateRating = (course: Course) => {
    if (course.courseRatings.length === 0) return 0;

    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });

    return Math.floor(totalRating / course.courseRatings.length)
  };

  const calculateChapterTime = (chapter: Chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course: Course) => {
    let time = 0;

    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach(
        (lecture) => (time += lecture.lectureDuration),
      ),
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateNoOfLectures = (course: Course) => {
    let totalLecture = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLecture += chapter.chapterContent.length;
      }
    });
    return totalLecture;
  };

  const fetchUserEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/user/enrolled-courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserEnrolledCourses();
    }
  }, [user]);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
    backendUrl,
    userData,
    setUserData,
    getToken,
    fetchAllCourses,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

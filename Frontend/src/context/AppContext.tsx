import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Chapter, Course, User } from "../types";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext, type AppContextValue } from "./app-context";

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

  const fetchAllCourses = useCallback(async () => {
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
  }, [backendUrl]);

  const fetchUserData = useCallback(async () => {
    if (user?.publicMetadata.role === "educator") {
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
  }, [backendUrl, getToken, user]);

  const calculateRating = useCallback((course: Course) => {
    if (course.courseRatings.length === 0) return 0;

    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });

    return Math.floor(totalRating / course.courseRatings.length);
  }, []);

  const calculateChapterTime = useCallback((chapter: Chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  }, []);

  const calculateCourseDuration = useCallback((course: Course) => {
    let time = 0;

    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach(
        (lecture) => (time += lecture.lectureDuration),
      ),
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  }, []);

  const calculateNoOfLectures = useCallback((course: Course) => {
    let totalLecture = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLecture += chapter.chapterContent.length;
      }
    });
    return totalLecture;
  }, []);

  const fetchUserEnrolledCourses = useCallback(async () => {
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
  }, [backendUrl, getToken]);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserEnrolledCourses();
    }
  }, [fetchUserData, fetchUserEnrolledCourses, user]);

  const value: AppContextValue = {
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

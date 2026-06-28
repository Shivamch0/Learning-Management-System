import { useEffect, useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";

import SeachBar from "../../components/student/SearchBar";
import CourseCard from '../../components/student/CourseCard';
import Footer from '../../components/student/Footer'
import type { Course } from "../../types";



const CoursesList = () => {
  const { navigate , allCourses } = useAppContext()
  const {input} = useParams();
  const [filteredCourse , setFilteredCourse] = useState<Course[]>([]);

  useEffect(()=> {
    if(allCourses && allCourses.length > 0){
      const tempCourses = allCourses.slice()

      if (input) {
        setFilteredCourse(
          tempCourses.filter((item) =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase()),
          ),
        );
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  } , [allCourses , input])


  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-center justify-between w-full">
          <div  className="text-4xl font-semibold text-gray-800">
            <h1>Course List</h1>
            <p className="text-gray-500">
              <span
                onClick={() => navigate("/")}
                className="text-blue-600 cursor-pointer"
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>
          <SeachBar data={input} />
        </div>

        {
          input && <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{input}</p>
            <img src={assets.cross_icon} alt="cross" className="cursor-pointer" onClick={() => navigate("/course-list")}  />
          </div>
        }

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourse.map((course , index) => <CourseCard key={index} course={course} />)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;

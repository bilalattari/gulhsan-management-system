import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Header";
import axios from "axios";
import { AppRoutes } from "../../constant/constant";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

export default function Students() {
  const [students, setStudents] = useState({
    count: 0,
    students: [],
    studentsByCourse: [],
  });
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState({
    course: "all",
    aboveAge: "all",
    belowAge: "all",
    city: "all",
  });

  useEffect(() => {
    getStudents();
    getCourses();
  }, [filter]);

  const getStudents = () => {
    axios
      .get(
        `${AppRoutes.getStudents}?course=${filter.course}&aboveAge=${filter.aboveAge}&belowAge=${filter.belowAge}&city=${filter.city}`,
        {
          headers: {
            Authorization: `Bearer ` + Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        setStudents(res.data?.data);
        console.log("student=>", res.data);
      });
  };

  const getCourses = () => {
    if (!courses.length) {
      axios
        .get(AppRoutes.getCourses, {
          headers: {
            Authorization: `Bearer ` + Cookies.get("token"),
          },
        })
        .then((res) => {
          setCourses(res.data?.data);
          console.log("Courses=>", res.data);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Students</h1>

        <div className="flex gap-5">
          <select
            onChange={(e) => setFilter({ ...filter, course: e.target.value })}
            className="w-56 border p-2"
          >
            <option key={"all"} value={"all"}>
              Select Course
            </option>
            {courses.map((data) => (
              <option key={data._id} value={data._id}>
                {data.title}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setFilter({ ...filter, aboveAge: e.target.value })}
            className="w-56 border p-2"
          >
            <option key={"all"} value={"all"}>
              See Above Any Age
            </option>
            {["10", "12", "14", "18", "20", "22", "24", "26"].map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setFilter({ ...filter, city: e.target.value })}
            className="w-56 border p-2"
          >
            <option key={"all"} value={"all"}>
              Select City
            </option>
            {[
              "Lahore",
              "Islamabad",
              "Karachi",
              "Quetta",
              "Multan",
              "Rawalpindi",
              "Faisalabad",
            ].map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>

          <h1 className="text-5xl text-end font-bold flex-grow">
            {students.count}
          </h1>
        </div>

        <div className="flex gap-10 mt-5">
          {students.studentsByCourse.map((data) => {
            return (
              <div key={data._id} className="border p-4 shadow rounded">
                <h1 className="font-bold">
                  {data.course.title} : {data.totalQuantity}
                </h1>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 my-10 gap-10">
          {students?.students?.map((student) => {
            return (
              <div key={student._id} className="border rounded overflow-hidden">
                <div className="p-2 ">
                  <h1 className="font-bold">
                    {student.name + " " + student.father_name}
                  </h1>
                  <h1>Course : {student.course.title}</h1>
                  <h1>Age : {student.age}</h1>
                  <h1>City : {student.city}</h1>
                  <h1>Country : {student.country}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

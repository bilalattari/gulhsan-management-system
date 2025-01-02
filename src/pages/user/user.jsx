import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Header";
import axios from "axios";
import { AppRoutes } from "../../constant/constant";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

export default function User() {
  const { user, setUser } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
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
  };

  const handleAddCourse = () => {
    console.log(newCourse);
    axios
      .post(AppRoutes.addCourse, newCourse, {
        headers: {
          Authorization: `Bearer ` + Cookies.get("token"),
        },
      })
      .then((res) => {
        console.log("Course Added=>", res.data);
        setShowModal(false); // Close modal after submission
        getCourses(); // Refresh the courses list
      })
      .catch((err) => {
        console.error("Error Adding Course=>", err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Courses</h1>
        {user.role == "admin" ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => setShowModal(true)}
          >
            Add Course
          </button>
        ) : null}

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => {
            Cookies.set("token", null);
            setUser(null);
          }}
        >
          Logout
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add New Course</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Course Title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Course Description"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  value={newCourse.thumbnail}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, thumbnail: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Thumbnail URL"
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleAddCourse}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 my-10 gap-10">
          {courses?.map((course) => {
            return (
              <div className="border rounded overflow-hidden">
                <img src={course.thumbnail} className="h-48 w-full" />
                <div className="p-2 ">
                  <h1 className="font-bold">{course.title}</h1>
                  <h1>{course.description}</h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

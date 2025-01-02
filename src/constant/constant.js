const devUrl = "http://localhost:4000/";
const prodUrl = "https://batch-11-node-with-mongodb.onrender.com/";

export const BASE_URL = devUrl;

export const AppRoutes = {
  login: BASE_URL + "auth/login",
  register: BASE_URL + "auth/register",
  getMyInfo: BASE_URL + "user/myInfo",
  getCourses: BASE_URL + "course",
  getStudents: BASE_URL + "students",
  addCourse: BASE_URL + "course",
};

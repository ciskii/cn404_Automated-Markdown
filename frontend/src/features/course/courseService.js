const axios = require("axios");
const api = "http://localhost:5000/api/course/";
const enrollmentApi = "http://localhost:5000/api/enrollment/";

const create = async (course, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + "create",
      {
        courseId: course.courseId,
        courseName: course.courseName,
        semester: course.semester,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const enrollCourse = async (courseId, rejectWithValue) => {
  try {
    const res = await axios.post(
      enrollmentApi + "enrollCourse",
      {
        courseId: courseId,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const getAllCourses = async (course, rejectWithValue) => {
  try {
    const res = await axios.get(api + "getAll", { withCredentials: true });
    return res.data.courses;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};
const courseService = {
  create,
  getAllCourses,
  enrollCourse,
};

export default courseService;

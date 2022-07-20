import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "./courseService";

const initialState = {
  course: {
    id: "",
    courseId: "",
    name: "",
  },
  courses: [],
  isIdle: true,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const create = createAsyncThunk(
  "course/create",
  async (course, { rejectWithValue }) => {
    const response = await courseService.create(course, rejectWithValue);

    return response;
  }
);

export const getAllCourses = createAsyncThunk(
  "course/getAllCourses",
  async (course, { rejectWithValue }) => {
    const response = await courseService.getAllCourses(course, rejectWithValue);

    return response;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    reset: () => initialState,
    setCourse: (state, action) => {
      state.course = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.course = action.payload;
        state.isSuccess = true;
      })
      .addCase(create.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllCourses.pending, (state) => {
        state.isIdle = false;
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setCourse } = courseSlice.actions;
export default courseSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";

const initialState = {
  quiz: {},
  quizzes: [],
  isIdle: true,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const create = createAsyncThunk(
  "quiz/create",
  async (quiz, { rejectWithValue }) => {
    const response = await quizService.create(quiz, rejectWithValue);

    return response;
  }
);

export const getAllQuizzes = createAsyncThunk(
  "quiz/getAllQuizzes",
  async (CourseId, { rejectWithValue }) => {
    const response = await quizService.getAllQuizzes(CourseId, rejectWithValue);

    return response;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    reset: () => initialState,
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.isSuccess = true;
      })
      .addCase(create.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllQuizzes.pending, (state) => {
        state.isIdle = false;
        state.isLoading = true;
      })
      .addCase(getAllQuizzes.fulfilled, (state, action) => {
        state.quizzes = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllQuizzes.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setQuiz } = quizSlice.actions;
export default quizSlice.reducer;

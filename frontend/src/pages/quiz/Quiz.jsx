import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import { getAllQuizzes, setQuiz } from "features/quiz/quizSlice";
import "./quiz.css";

const Quiz = (props) => {
  const dispatch = useDispatch();

  const quiz = props.quiz;

  const handleSetQuiz = () => {
    dispatch(setQuiz(quiz));
  };

  return (
    <>
      <Link
        to={`/quiz-creator/${quiz.id}`}
        className='question-link'
        onClick={handleSetQuiz}
      >
        <Button fullWidth variant='outlined' className='quiz' color='info'>
          {quiz.name}
        </Button>
      </Link>
    </>
  );
};

export default Quiz;

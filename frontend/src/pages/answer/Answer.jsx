import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MarkdownRenderer from "./MarkdownRenderer";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import CodeMirror from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";

import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { create, reset } from "features/answer/answerSlice";
import { getAllQuestions } from "features/question/questionSlice";
import { myTheme } from "utils/theme";
import "github-markdown-css";
import "./answer.css";

const Answer = () => {
  const [language, setLanguage] = React.useState("");

  const handleLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const [curCode, setCurCode] = useState(""); // current code at selected page
  const [curCodes, setCurCodes] = useState([]); // set of current code for each questions  array of obj. {QuestionObj, answerObj}
  const [curQuestion, setCurQuestion] = useState(""); //current question on selected page
  const [page, setPage] = useState(1); // total page number
  const [curPage, setCurPage] = useState(1); // current selected page

  const [curParams, setCurParams] = useState("");
  const [curStudent, setCurStudent] = useState("");
  const [curSolution, setCurSolution] = useState("");
  const [curLanguage, setCurLanguage] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { isIdle, questions } = useSelector((state) => state.question); // Questions from teacher
  const { quiz } = useSelector((state) => state.quiz); // quiz obj.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePage = (e, value) => {
    const newCodes = curCodes.map((item) => {
      return { ...item };
    });
    newCodes[curPage - 1].answerObj = curCode;
    setCurCodes(newCodes);

    setCurCode(curCodes[value - 1].answerObj);
    setCurPage(value);
    setCurQuestion(questions[value - 1].questionObj); // change question for new page
  };

  const handleSave = async () => {
    const savedAnswersObj = curCodes.map((item) => {
      return { ...item };
    });
    savedAnswersObj[curPage - 1].answerObj = curCode;

    const savedAnswers = {
      id: user.id,
      savedAnswersObj: savedAnswersObj,
      QuizId: quiz.id,
    };
    dispatch(create(savedAnswers))
      .unwrap()
      .then((res) => {
        navigate("/", { replace: true });
      });
  };

  // * try to understand useCallback and useMemo
  const changeHandler = useCallback((value, viewUpdate) => {
    setCurCode(value);
  }, []);

  useEffect(() => {
    // dispatch(getAllQuestions(params.QuizId)) // params.id -> QuizId
    dispatch(getAllQuestions(quiz.id)) // use quiz.id instead to prevent student to access quiz directly through the params
      .unwrap()
      .then((res) => {
        console.table(res);
        if (res.length !== 0) {
          const initialCodes = res.map((item) => {
            return {
              QuestionId: item.id, // question id
              answerObj: item.student,
              language: item.language,
            };
          }); // create default code for each question
          setCurCodes(initialCodes);
          setCurCode(initialCodes[0].answerObj);
          setCurQuestion(res[0].questionObj);
          setPage(res.length);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className='editor'>
      <div className='editor-title'>
        <Stack direction='row' sx={{ flex: 1 }} spacing={1}>
          <Link to='/'>
            <Tooltip title='Home'>
              <IconButton aria-label='home'>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <h4 className='editor-title-label'>{quiz.name}</h4>
        </Stack>

        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ flex: 1 }}
          spacing={10}
        >
          <h4 className='editor-title-label'>{quiz.name}</h4>
          <IconButton
            color='primary'
            aria-label='Save a quiz'
            onClick={handleSave}
          >
            <SaveIcon />
          </IconButton>
        </Stack>
      </div>

      <div className='editor-container'>
        <MarkdownRenderer question={curQuestion} />

        <CodeMirror
          value={curCode}
          extensions={[javascript()]}
          onChange={changeHandler}
          height='100%'
          theme={githubLight}
          className='quiz-editor'
        />
      </div>

      <Stack
        spacing={2}
        justifyContent='center'
        alignItems='center'
        sx={{ py: [1, 1] }}
      >
        <Pagination
          count={page}
          page={curPage}
          color='primary'
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
};

export default Answer;

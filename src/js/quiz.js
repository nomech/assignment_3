//  Array of questions and answers in object form.
import { questions, successMessage, failureMessage } from "./data.js";

//  Initializing variables
let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

const questionForm = document.querySelector(".quiz__form");
const questionBox = document.querySelector(".quiz__question-box");
const progress = document.querySelector(".quiz__progress");
const quizMain = document.querySelector(".quiz-main");
const quizStats = document.querySelector(".quiz__stats");
const scorePoints = document.querySelector(".score__points");

//  Event listener for the start button
const startButton = document.querySelector(".button--start");
startButton.addEventListener("click", () => startQuiz());

//  Function to start the quiz
const startQuiz = () => {
  createQuestionElement(currentQuestion);

  //  Hiding the quiz intro and displaying the quiz
  const quizIntro = document.querySelector(".quiz__intro");
  quizIntro.classList.toggle("hide");
  questionForm.classList.toggle("hide");
  quizStats.classList.toggle("hide");
};

//  Function to create the question element
const createQuestionElement = (index) => {
  //  Updating the progress tracker
  updateProgressTracker();

  //  Creating the question element
  const question = document.querySelector(".quiz__question");
  question.innerText = questions[index].question;

  //  Creating the answer element
  const answers = questions[index].answers;

  //  Looping through the answers array to create the answer elements
  answers.forEach((answer, index) => {
    const inputField = createInputElement(
      "quiz__input",
      "radio",
      "answer",
      index,
      answer
    );

    //  Appending the input field to the form
    questionForm.appendChild(inputField);
    //  Creating the label element
    const label = createLabelElement("quiz__label", answer, answer);
    //  Appending the label to the form
    questionForm.appendChild(label);
  });

  const buttonLabel =
    currentQuestion === questions.length - 1 ? "Submit" : "Next";
  const buttonClass =
    currentQuestion === questions.length - 1
      ? "button button--submit"
      : "button button--next";

  //  Creating the submit button
  const submitButton = createButtonElement(
    buttonClass,
    "button",
    buttonLabel,
    "click",
    submitAnswer
  );
  //  Appending the submit button to the form
  questionForm.appendChild(submitButton);
};

//  Function to create an input element
const createInputElement = (className, type, name, value, id) => {
  const input = document.createElement("input");
  input.className = className;
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  input.id = id;
  input.setAttribute("value", value);

  return input;
};

//  Function to create a label element
const createLabelElement = (className, name, text) => {
  const label = document.createElement("label");
  label.className = className;
  label.setAttribute("for", name);
  label.innerText = text;

  return label;
};

//  Function to create a button element
const createButtonElement = (className, type, text, listner, event) => {
  const button = document.createElement("button");
  button.className = className;
  button.setAttribute("type", type);
  button.innerText = text;
  button.addEventListener(listner, event);

  return button;
};

//  Function to clear an element
const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

//  Function to submit an answer
const submitAnswer = (event) => {
  //  Preventing the default behavior of the form
  event.preventDefault();

  //  Getting the selected answer
  const quizForm = document.querySelector(".quiz__form");
  const quizInput = document.querySelector(".quiz__input:checked");
  let selectedAnswer = null;

  //  Checking if the quiz input exists
  if (quizInput) {
    selectedAnswer = parseInt(quizInput.value);
  }

  //  Checking if the selected answer is not null
  if (selectedAnswer !== null) {
    //  Getting the correct answer
    const correctAnswer = questions[currentQuestion].correct;

    //  Setting the user answer
    questions[currentQuestion].userAnswer = selectedAnswer;

    //  Checking if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
      //  Incrementing the correct answers
      correctAnswers++;
    } else {
      //  Incrementing the wrong answers
      wrongAnswers++;
    }

    //  Incrementing the current question
    currentQuestion++;

    //  Clearing the question box and the form
    clearElement(quizForm);

    //  Checking if there are more questions
    if (currentQuestion < questions.length) {
      //  Creating the next question
      createQuestionElement(currentQuestion);
    } else {
      //  Ending the quiz
      endQuiz();
    }
  }
  //  Updating the score tracker
  updateScoreTracker();
};

//  Function to end the quiz
const endQuiz = () => {
  progress.classList.toggle("hide");

  //  Clearing the question box and the form
  questionBox.classList.toggle("hide");

  //  Creating the results section
  const quiz = document.querySelector(".quiz");
  const results = document.createElement("section");
  results.className = "results";
  quiz.appendChild(results);

  //  Displaying the results
  const resultsHeader = document.createElement("h2");
  resultsHeader.innerText = `Correct Answers: ${correctAnswers} | Wrong Answers: ${wrongAnswers}`;
  resultsHeader.classList.add("results__header");
  results.appendChild(resultsHeader);

  const resultsMessage = document.createElement("h2");
  resultsMessage.classList.add("results__message");

  if (correctAnswers > wrongAnswers) {
    const successIndex = Math.floor(Math.random() * successMessage.length);
    resultsMessage.innerText = successMessage[successIndex];
 
  } else if (correctAnswers <= wrongAnswers) {
    const failureIndex = Math.floor(Math.random() * failureMessage.length);
    resultsMessage.innerText = failureMessage[failureIndex];
  }

  results.append(resultsMessage);
  const buttonGroup = document.createElement("div");
  buttonGroup.classList = "results__button-group";
  results.append(buttonGroup);

  //  Creating the reset button
  const resetButton = createButtonElement(
    "button button--reset",
    "button",
    "Reset Assessment",
    "click",
    () => resetQuiz(".results")
  );

  const reviewButton = createButtonElement(
    "button button--review",
    "button",
    "Review Assessment",
    "click",
    reviewQuiz
  );

  buttonGroup.appendChild(resetButton);
  buttonGroup.appendChild(reviewButton);
};

//  Function to reset the quiz
const resetQuiz = () => {
  //  Clearing the results section
  const reset = document.querySelector(".results");
  reset.remove();

  //  Resetting the variables
  currentQuestion = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  scorePoints.innerText = "100%";
  progress.classList.toggle("hide");
  questionBox.classList.toggle("hide");
  quizMain.classList.remove("unset-height");

  //  Creating the first question
  createQuestionElement(currentQuestion);
};

//  Function to update the score tracker
// Starts at 100% and decreases if answer is wrong
const updateScoreTracker = () => {
  const score = 100 - (wrongAnswers / questions.length) * 100;
  scorePoints.innerText = `${Math.round(score)}%`;
};

//  Function to update the progress tracker
const updateProgressTracker = () => {
  //  Updating the progress tracker
  progress.innerText = `Question: ${currentQuestion + 1} / ${questions.length}`;
};

const reviewQuiz = () => {
  quizMain.classList.toggle("unset-height");

  //  Clearing the results section
  const resultsHeader = document.querySelector(".results__header");
  //results.remove();

  //  Creating the first question
  const review = document.createElement("div");
  review.classList = "review";
  resultsHeader.after(review);

  questions.forEach((question, index) => {
    const reviewBox = document.createElement("div");
    reviewBox.classList = "review__box";
    review.appendChild(reviewBox);

    const questionElement = document.createElement("p");
    questionElement.classList = "review__question";
    questionElement.innerText = question.question;
    reviewBox.appendChild(questionElement);

    const userAnswer = document.createElement("p");
    userAnswer.classList = "review__user-answer";

    if (questions[index].userAnswer === questions[index].correct) {
      userAnswer.classList.add("correct");
    } else {
      userAnswer.classList.add("wrong");
    }

    userAnswer.innerText = `You'r answer: ${
      question.answers[question.userAnswer]
    }`;

    reviewBox.appendChild(userAnswer);

    const correctAnswer = document.createElement("p");
    correctAnswer.classList = "review__correct-answer";
    correctAnswer.innerText = `Correct answer: ${
      question.answers[question.correct]
    }`;
    reviewBox.appendChild(correctAnswer);
  });

  const reviewButton = document.querySelector(".button--review");
  reviewButton.remove();
};

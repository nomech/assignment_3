  //  Array of questions and answers in object form.
  import { questions, successMessage, failureMessage } from "./data.js";

  //  Initializing variables
  let currentQuestion = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let quizOver = false;

  //  Event listener for the start button
  let startButton = document.querySelector(".button--start");
  startButton.addEventListener("click", () => startQuiz());

  //  Function to start the quiz
  const startQuiz = () => {
    createQuestionElement(currentQuestion);

    //  Hiding the quiz intro and displaying the quiz
    const quizIntro = document.querySelector(".quiz__intro");
    quizIntro.style.display = "none";

    const quiz = document.querySelector(".quiz");
    quiz.style.display = "flex";
  };

  //  Function to create the question element
  const createQuestionElement = (index) => {
    //  Creating the question element
    const questionBox = document.querySelector(".quiz__question-box");
    const question = document.querySelector(".quiz__question");
    question.innerText = questions[index].question;
    questionBox.appendChild(question);

    //  Creating the answer element
    const answerForm = document.querySelector(".quiz__form");
    const answers = questions[index].answers;

    //  Looping through the answers array to create the answer elements
    answers.forEach((answer) => {
      const inputField = createInputElement(
        "quiz__input",
        "radio",
        "answer",
        index,
        answer
      );
      //  Appending the input field to the form
      answerForm.appendChild(inputField);
      //  Creating the label element
      const label = createLabelElement("quiz__label", answer, answer);
      //  Appending the label to the form
      answerForm.appendChild(label);
    });

    //  Creating the submit button
    const submitButton = createButtonElement(
      "button button--submit",
      "button",
      "Submit",
      "click",
      submitAnswer
    );
    //  Appending the submit button to the form
    answerForm.appendChild(submitButton);
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
    const questionBox = document.querySelector(".quiz__question");
    const quizForm = document.querySelector(".quiz__form");
    const selectedAnswer = document.querySelector(
      'input[name="answer"]:checked'
    ).value;

    questions[currentQuestion].userAnswer = parseInt(selectedAnswer);

    console.log(questions);

    //  Checking if the selected answer is correct
    if (selectedAnswer === questions[currentQuestion].correct) {
      //  Incrementing the correct answers
      correctAnswers++;
    } else {
      //  Incrementing the wrong answers
      wrongAnswers++;
    }

    console.log(correctAnswers, wrongAnswers);
    //  Incrementing the current question
    currentQuestion++;

    //  Clearing the question box and the form
    clearElement(questionBox);
    clearElement(quizForm);

    //  Checking if there are more questions
    if (currentQuestion < questions.length) {
      //  Creating the next question
      createQuestionElement(currentQuestion);
    } else {
      //  Ending the quiz
      endQuiz();
    }
  };

  //  Function to end the quiz
  const endQuiz = () => {
    //  Clearing the question box and the form
    const quizQuestionBox = document.querySelector(".quiz__question-box");
    quizQuestionBox.style.display = "none";
    
    //
    const quizForm = document.querySelector(".quiz__form");
    //quizForm.style.display = "none";

    //  Creating the results section
    const quiz = document.querySelector(".quiz");
    const results = document.createElement("section");
    results.className = "results";
    quiz.appendChild(results);

    //  Displaying the results
    const resultsHeader = document.createElement("h2");
    resultsHeader.innerText = `Correct Answers: ${correctAnswers} | Wrong Answers: ${wrongAnswers}`;
    results.appendChild(resultsHeader);

    if(correctAnswers > wrongAnswers){
      const successIndex = Math.floor(Math.random() * successMessage.length);
      
      const resultsHeader = document.createElement("h2");
      resultsHeader.innerText = successMessage[successIndex];
      results.appendChild(resultsHeader);
    } else if(correctAnswers < wrongAnswers){
      const failureIndex = Math.floor(Math.random() * failureMessage.length);
      
      const resultsHeader = document.createElement("h2");
      resultsHeader.innerText = failureMessage[failureIndex];
      results.appendChild(resultsHeader);
    }

    //  Creating the reset button
    const resetButton = createButtonElement(
      "button button--reset",
      "button",
      "Reset Quiz",
      "click",
      resetQuiz
    );

    results.appendChild(resetButton);

    //  Setting the quiz as over
    quizOver = true;
  };

  //  Function to reset the quiz
  const resetQuiz = () => {
    //  Clearing the results section
    const results = document.querySelector(".results");
    results.remove();

    //  Resetting the variables
    currentQuestion = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    quizOver = false;

    const questionBox = document.querySelector(".quiz__question-box");
    questionBox.style.display = "block";

    //  Creating the first question
    createQuestionElement(currentQuestion);
  };

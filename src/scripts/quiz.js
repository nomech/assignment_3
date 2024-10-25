  //  Array of questions and answers in object form.
  import { questions, successMessage, failureMessage } from "./data.js";

  //  Initializing variables
  let currentQuestion = 0;
  let correctAnswers = 0;
  let wrongAnswers = 0;

  //  Event listener for the start button
  const startButton = document.querySelector(".button--start");
  startButton.addEventListener("click", () => startQuiz());

  //  Function to start the quiz
  const startQuiz = () => {
    createQuestionElement(currentQuestion);

    //  Hiding the quiz intro and displaying the quiz
    const quizIntro = document.querySelector(".quiz__intro");
    quizIntro.classList.toggle("hide");

    const questionForm = document.querySelector(".quiz__form");
    questionForm.classList.toggle("hide");
  };

  //  Function to create the question element
  const createQuestionElement = (index) => {
    //  Update progress tracker
    updateProgressTracker();

    //  Creating the question element
    const question = document.querySelector(".quiz__question");
    question.innerText = questions[index].question;

    //  Creating the answer element
    const answerForm = document.querySelector(".quiz__form");
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
      answerForm.appendChild(inputField);
      //  Creating the label element
      const label = createLabelElement("quiz__label", answer, answer);
      //  Appending the label to the form
      answerForm.appendChild(label);
    });

    const buttonLabel =
      currentQuestion === questions.length - 1 ? "Submit" : "Next";
      const buttonClass =
      currentQuestion === questions.length - 1 ? "button button--submit" : "button button--next";

    //  Creating the submit button
    const submitButton = createButtonElement(
      buttonClass,
      "button",
      buttonLabel,
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
    const quizForm = document.querySelector(".quiz__form");
    const selectedAnswer = parseInt(
      document.querySelector('input[name="answer"]:checked').value
    );

    const correctAnswer = questions[currentQuestion].correct;
    questions[currentQuestion].userAnswer = selectedAnswer;

    //  Checking if the selected answer is correct
    if (selectedAnswer === correctAnswer) {
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
    const progress = document.querySelector(".quiz__progress");
    progress.classList.toggle("hide");

    //  Clearing the question box and the form
    const quizQuestionBox = document.querySelector(".quiz__question-box");
    quizQuestionBox.classList.toggle("hide");

    //  Creating the results section
    const quiz = document.querySelector(".quiz");
    const results = document.createElement("section");
    results.className = "results";
    quiz.appendChild(results);

    //  Displaying the results
    const resultsHeader = document.createElement("h2");
    resultsHeader.innerText = `Correct Answers: ${correctAnswers} | Wrong Answers: ${wrongAnswers}`;
    results.appendChild(resultsHeader);

    if (correctAnswers > wrongAnswers) {
      const successIndex = Math.floor(Math.random() * successMessage.length);

      const resultsHeader = document.createElement("h2");
      resultsHeader.classList = "results__header";
      resultsHeader.innerText = successMessage[successIndex];
      results.appendChild(resultsHeader);
    } else if (correctAnswers < wrongAnswers) {
      const failureIndex = Math.floor(Math.random() * failureMessage.length);

      const resultsHeader = document.createElement("h2");
      resultsHeader.classList = "results__header";
      resultsHeader.innerText = failureMessage[failureIndex];
      results.appendChild(resultsHeader);
    }

    const buttonGroup = document.createElement("div");
    buttonGroup.classList = "results__button-group";
    results.appendChild(buttonGroup);

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

    //  Setting the quiz as over
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

    const body = document.querySelector("body");
    body.style.height = "100vh";

    const questionBox = document.querySelector(".quiz__question-box");
    questionBox.classList.toggle("hide");

    //  Creating the first question
    createQuestionElement(currentQuestion);
  };

  //  Function to update the progress tracker
  const updateProgressTracker = () => {
    //  Updating the progress tracker
    const progress = document.querySelector(".quiz__progress");
    progress.innerText = `Question: ${currentQuestion + 1} / ${questions.length}`;
  };

  const reviewQuiz = () => {
    const body = document.querySelector("body");
    body.style.height = "unset";

    //  Clearing the results section
    const resultsHeader = document.querySelector(".results__header");
    //results.remove();

    //  Creating the first question
    const review = document.createElement("div");
    review.classList = "review";
    resultsHeader.after(review);

    questions.forEach((question) => {
      console.log(question);
      const reviewBox = document.createElement("div");
      reviewBox.classList = "review__box";
      review.appendChild(reviewBox);

      const questionElement = document.createElement("p");
      questionElement.classList = "review__question";
      questionElement.innerText = question.question;
      reviewBox.appendChild(questionElement);

      const userAnswer = document.createElement("p");
      userAnswer.classList = "review__user-answer";
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

//  Array of questions and answers in object form.
const questions = [
    {
      question: "Who is the spiritual and political leader of the Imperium of Man?",
      answers: [
        "The Emperor of Mankind",
        "The Fabricator General",
        "The High Lord of Terra",
        "The Warmaster",
      ],
      correct: "The Emperor of Mankind",
    },
    {
      question: "Which organization serves as the secret police, hunting heretics and xenos threats?",
      answers: [
        "Adeptus Custodes",
        "Adeptus Arbites",
        "Inquisition",
        "Astra Militarum",
      ],
      correct: "Inquisition",
    },
    {
      question: "What is the purpose of the Astronomican?",
      answers: [
        "To train new Space Marines",
        "To provide a psychic beacon for Imperial ships in the warp",
        "To monitor the Imperium's resources",
        "To coordinate battles on Terra",
      ],
      correct: "To provide a psychic beacon for Imperial ships in the warp",
    },
    {
      question: "What is the Adeptus Mechanicus primarily known for?",
      answers: [
        "Maintaining and developing Imperial technology",
        "Overseeing the military operations of the Astra Militarum",
        "Training Imperial Psykers",
        "Protecting the Emperor on Terra",
      ],
      correct: "Maintaining and developing Imperial technology",
    },
    {
      question: "What is an STC, and why is it significant?",
      answers: [
        "A Sacred Text Codex, used by the Ecclesiarchy",
        "A Synthetic Technology Core, powering the Astronomican",
        "A Standard Template Construct, containing ancient technology blueprints",
        "A Shielded Tactical Chassis for Space Marines",
      ],
      correct: "A Standard Template Construct, containing ancient technology blueprints",
    },
    {
      question: "Which world is the home of the Adeptus Mechanicus?",
      answers: [
        "Terra",
        "Mars",
        "Cadia",
        "Fenris",
      ],
      correct: "Mars",
    },
    {
      question: "What is the primary goal of the Orks in the galaxy?",
      answers: [
        "To conquer Terra",
        "To accumulate wealth",
        "To have fun and engage in combat",
        "To eradicate the Eldar",
      ],
      correct: "To have fun and engage in combat",
    },
    {
      question: "Which faction is known for its advanced psychic powers and ancient knowledge?",
      answers: [
        "Tau Empire",
        "Aeldari (Eldar)",
        "Necrons",
        "Chaos Space Marines",
      ],
      correct: "Aeldari (Eldar)",
    },
    {
      question: "Who protects the Emperor in the Imperial Palace?",
      answers: [
        "Adeptus Astartes",
        "Adeptus Custodes",
        "Astra Militarum",
        "Inquisition",
      ],
      correct: "Adeptus Custodes",
    },
    {
      question: "What is the Adeptus Astartes also known as?",
      answers: [
        "The Inquisition",
        "The Imperial Guard",
        "The Space Marines",
        "The Schola Progenium",
      ],
      correct: "The Space Marines",
    },
    {
      question: "What is the primary function of the Ecclesiarchy?",
      answers: [
        "To command the Imperial Guard",
        "To enforce the worship of the Emperor across the Imperium",
        "To train Tech-Priests",
        "To protect the Emperor on Terra",
      ],
      correct: "To enforce the worship of the Emperor across the Imperium",
    },
    {
      question: "What is the Black Library, and who guards it?",
      answers: [
        "A repository of psychic knowledge, guarded by the Harlequins",
        "A library of STCs, guarded by the Adeptus Mechanicus",
        "The training center for Imperial Assassins, guarded by the Officio Assassinorum",
        "A hall of sacred relics, guarded by the Adeptus Custodes",
      ],
      correct: "A repository of psychic knowledge, guarded by the Harlequins",
    }
  ];

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
  quiz.style.display = "block";
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
      answer,
      answer
    );
    answerForm.appendChild(inputField);
    //  Creating the label element
    const label = createLabelElement("quiz__label", answer, answer);
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

  //  Checking if the selected answer is correct
  if (selectedAnswer === questions[currentQuestion].correct) {
    //  Incrementing the correct answers
    correctAnswers++;
  } else {
    //  Incrementing the wrong answers
    wrongAnswers++;
  }

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
  //  Creating the results section
  const quiz = document.querySelector(".quiz");
  const results = document.createElement("section");
  results.className = "results";
  quiz.appendChild(results);

  //  Displaying the results
  const resultsHeader = document.createElement("h2");
  resultsHeader.innerText = `Correct Answers: ${correctAnswers} | Wrong Answers: ${wrongAnswers}`;
  results.appendChild(resultsHeader);

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

  //  Creating the first question
  createQuestionElement(currentQuestion);
};

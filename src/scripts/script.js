const questions = [
  {
    question: "What is the primary enemy of the Imperium of Man??",
    answers: ["Orks", "Eldar", "Tyranids", "Chaos"],
    correct: "Chaos",
  },
  {
    question: "Which organization serves as the secret police of the Imperium?",
    answers: [
      "Adeptus Arbites",
      "Adeptus Custodes",
      "Inquisition",
      "Officio Assassinorum",
    ],
    correct: "Inquisition",
  },
  {
    question:
      "What is the homeworld of the Space Marines' Ultramarines chapter?",
    answers: ["Terra", "Mars", "Macragge", "Baal"],
    correct: "Macragge",
  },
  {
    question: "Who is the leader of the Necron forces?",
    answers: [
      "The Silent King",
      "The Nightbringer",
      "The Deceiver",
      "The Outsider",
    ],
    correct: "The Silent King",
  },
  {
    question: "What material powers the weapons of the Adeptus Mechanicus?",
    answers: ["Promethium", "Plasma", "Adamantium", "STC"],
    correct: "Plasma",
  },
  {
    question:
      "Which faction is known for their psychic powers and pursuit of knowledge?",
    answers: ["Aeldari", "Tau", "Necron", "Tyranids"],
    correct: "Aeldari",
  },
  {
    question: "Which chapter is known as the 'Angels of Death'?",
    answers: ["Ultramarines", "Blood Angels", "Dark Angels", "Space Wolves"],
    correct: "Blood Angels",
  },
  {
    question: "What is the primary motivation of the Ork race?",
    answers: ["Conquest", "Knowledge", "Fun and Fighting", "Honor"],
    correct: "Fun and Fighting",
  },
];

let currentQuestion = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let quizOver = false;

let startButton = document.querySelector(".header__start-button");
startButton.addEventListener("click", () => startQuiz());

const startQuiz = () => {
  createQuestionElement(currentQuestion);
  const header = document.querySelector(".header");
  header.style.display = "none";
};

const createQuestionElement = (index) => {
  const questionBox = document.querySelector(".quiz__question-box");
  const question = document.querySelector(".quiz__question");
  question.innerText = questions[index].question;
  questionBox.appendChild(question);

  const answerForm = document.querySelector(".quiz__form");
  const answers = questions[index].answers;

  answers.forEach((answer) => {
    answerForm.appendChild(createInputElement("quiz_input", "radio", "answer", answer, answer));
    answerForm.appendChild(createLabelElement("quiz__label", answer, answer));
  });

  const submitButton = document.createElement("button");
  submitButton.className = "question-box__submit";
  submitButton.innerText = "Submit";
  submitButton.setAttribute("type", "button");
  submitButton.addEventListener("click", (event) => submitAnswer(event));
  answerForm.appendChild(createButtonElement("question-box__submit", "button", "Submit", "click", submitAnswer));
};

const createInputElement = (className, type, name, value, id) => {
  const input = document.createElement("input");
  input.className = className;
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  input.id = id;
  input.setAttribute("value", value);
  return input;
}

const createLabelElement = (className, name, text) => {
  const label = document.createElement("label");
  label.className = className;
  label.setAttribute("for", name);
  label.innerText = text;
  return label;
}

const createButtonElement = (className, type, text, listner, event) => {
  const button = document.createElement("button");
  button.className = className;
  button.setAttribute("type", type);
  button.innerText = text;
  button.addEventListener(listner, event)
  return button;
}

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const submitAnswer = (event) => {
  event.preventDefault();
  const questionBox = document.querySelector(".quiz__question");
  const quizForm = document.querySelector(".quiz__form");
  const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;
  if (selectedAnswer) {
    if (selectedAnswer === questions[currentQuestion].correct) {
      correctAnswers++;
    } else {
      wrongAnswers++;
    }

    currentQuestion++;
    clearElement(questionBox);
    clearElement(quizForm);

    if (currentQuestion < questions.length) {
      createQuestionElement(currentQuestion);
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer");
  }
};

const endQuiz = () => {
  const quiz = document.querySelector(".main");

  const results = document.createElement("section");
  results.className = "results";
  quiz.appendChild(results);

  const resultsHeader = document.createElement("h2");
  resultsHeader.innerText = `Correct Answers: ${correctAnswers} | Wrong Answers: ${wrongAnswers}`;
  results.appendChild(resultsHeader);

  const resetButton = document.createElement("button");
  resetButton.className = "results__reset";
  resetButton.innerText = "Reset";
  resetButton.setAttribute("type", "button");
  resetButton.addEventListener("click", resetQuiz);
  results.appendChild(resetButton);

  quizOver = true;
};

const resetQuiz = () => {
  const results = document.querySelector(".results");
  results.remove();

  currentQuestion = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  quizOver = false;
  createQuestionElement(currentQuestion);
};

const questions = [
  {
    question: "Who is worshipped as the Omnissiah by the Adeptus Mechanicus?",
    answers: [
      "The Emperor of Mankind",
      "The Fabricator General",
      "The Machine God",
      "The Void Dragon",
    ],
    correct: "The Machine God",
  },
  {
    question: "What is the primary homeworld of the Adeptus Mechanicus?",
    answers: ["Terra", "Cadia", "Mars", "Catachan"],
    correct: "Mars",
  },
  {
    question: "What is an STC, and why is it important to the Mechanicus?",
    answers: [
      "A Standard Template Construct, containing ancient technology blueprints",
      "A Synthetic Technology Core, powering servitors",
      "A Sacred Text of the Cult Mechanicus",
      "A Stealth Tech Console for covert operations",
    ],
    correct: "A Standard Template Construct, containing ancient technology blueprints",
  },
  {
    question: "Which of the following best describes a 'Tech-Priest'?",
    answers: [
      "A warrior specialized in anti-psyker warfare",
      "An Imperial Guard officer responsible for heavy weaponry",
      "A member of the Adeptus Mechanicus trained in machine rites",
      "A scribe who maintains records for the Administratum",
    ],
    correct: "A member of the Adeptus Mechanicus trained in machine rites",
  },
  {
    question: "What is the role of the Fabricator General?",
    answers: [
      "To command the forces of the Astra Militarum",
      "To lead the Adeptus Mechanicus",
      "To train Space Marines",
      "To enforce the Imperial Creed",
    ],
    correct: "To lead the Adeptus Mechanicus",
  },
  {
    question: "What is sacred to the followers of the Cult Mechanicus?",
    answers: [
      "Knowledge and technology",
      "Faith and piety",
      "Physical strength",
      "Psychic abilities",
    ],
    correct: "Knowledge and technology",
  },
  {
    question: "Which of these is a common weapon used by Tech-Priests?",
    answers: [
      "Chainsword",
      "Power Axe",
      "Lasgun",
      "Omnissian Axe",
    ],
    correct: "Omnissian Axe",
  },
  {
    question: "Which type of unit is often controlled by the Adeptus Mechanicus to perform labor and combat tasks?",
    answers: [
      "Servitors",
      "Guardsmen",
      "Necrons",
      "Astartes",
    ],
    correct: "Servitors",
  },
  {
    question: "What does the Rite of Maintenance involve?",
    answers: [
      "Praying to the Emperor",
      "Conducting repairs on machinery with sacred rituals",
      "Formulating new technology blueprints",
      "Engaging in combat exercises",
    ],
    correct: "Conducting repairs on machinery with sacred rituals",
  },
  {
    question: "The Adeptus Mechanicus works closely with which branch of the Imperium for battlefield logistics and war machinery?",
    answers: [
      "Adeptus Custodes",
      "Inquisition",
      "Astra Militarum",
      "Ecclesiarchy",
    ],
    correct: "Astra Militarum",
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

  const quiz = document.querySelector(".quiz");
  quiz.style.display = "block";
  
};

const createQuestionElement = (index) => {
  const questionBox = document.querySelector(".quiz__question-box");
  const question = document.querySelector(".quiz__question");
  question.innerText = questions[index].question;
  questionBox.appendChild(question);

  const answerForm = document.querySelector(".quiz__form");
  const answers = questions[index].answers;

  answers.forEach((answer) => {
    const inputField = createInputElement("quiz__input", "radio", "answer", answer, answer);
    answerForm.appendChild(inputField);

    const label = createLabelElement("quiz__label", answer, answer);
    answerForm.appendChild(label);
  });

  const submitButton = createButtonElement("quiz__button quiz__button--submit", "button", "Submit", "click", submitAnswer)
  answerForm.appendChild(submitButton);
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
  const quiz = document.querySelector(".quiz");

  const results = document.createElement("section");
  results.className = "results";
  quiz.appendChild(results);

  const resultsHeader = document.createElement("h2");
  resultsHeader.innerText = `Correct Answers: ${correctAnswers} | Wrong Answers: ${wrongAnswers}`;
  results.appendChild(resultsHeader);

  const resetButton = createButtonElement("quiz__button quiz__button--reset", "button", "Reset Quiz", "click", resetQuiz);
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

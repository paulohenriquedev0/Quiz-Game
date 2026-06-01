// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn"); // Agora existe no HTML!
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Qual tag HTML é utilizada para linkar um arquivo CSS externo?",
    answers: [
      { text: "<script>", correct: false },
      { text: "<link>", correct: true },
      { text: "<style>", correct: false },
      { text: "<href>", correct: false },
    ],
  },
  {
    question: "Qual método JavaScript é usado para adicionar um elemento ao final de um array?",
    answers: [
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "push()", correct: true },
      { text: "unshift()", correct: false },
    ],
  },
  {
    question: "Em uma API RESTful, qual método HTTP é o mais adequado para ATUALIZAR um recurso existente?",
    answers: [
      { text: "GET", correct: false },
      { text: "POST", correct: false },
      { text: "DELETE", correct: false },
      { text: "PUT / PATCH", correct: true },
    ],
  },
  {
    question: "No SQL, qual comando é utilizado para buscar dados de uma tabela?",
    answers: [
      { text: "GET", correct: false },
      { text: "SELECT", correct: true },
      { text: "SEARCH", correct: false },
      { text: "FIND", correct: false },
    ],
  },
  {
    question: "Qual comando Git é usado para enviar suas alterações locais para o repositório remoto?",
    answers: [
      { text: "git pull", correct: false },
      { text: "git commit", correct: false },
      { text: "git push", correct: true },
      { text: "git clone", correct: false },
    ],
  },
];

// Quiz State Vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // CORREÇÃO AQUI: Trocado {} por () para fazer a conta matemática
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  // CORREÇÃO AQUI: Ajustado o nome do parâmetro para 'answer' singular para não bugar
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answers-btn"); // Mudado para answers-btn para bater com o CSS

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;

  answersDisabled = true;

  const selectdButton = event.target;
  const isCorrect = selectdButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectdButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Trabalho PERFEITO! Você tá sabendo legal!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Ótimo trabalho! Tá quase em!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Bom trabalho! Precisa estudar mais!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Foi mal dessa vez!"; // Mudei um pouquinho aqui pra ficar mais amigável haha
  } else {
    resultMessage.textContent = "Continue estudando!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}

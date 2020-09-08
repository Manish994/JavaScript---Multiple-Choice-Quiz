//Select All Elements
const startElement = document.getElementById("start");
const quizElement = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const qImgElement = document.getElementById("qImg");
const choiceAElement = document.getElementById("A");
const choiceBElement = document.getElementById("B");
const choiceCElement = document.getElementById("C");
const counterElement = document.getElementById("counter");
const timeGaugeElement = document.getElementById("timeGauge");
const progressElement = document.getElementById("progress");
const scoreContainerElement = document.getElementById("scoreContainer");

//
//Create Our Questions Which is inside Array
let questions = [{
    question: "What does HTML stand for?",
    img: "img/html.png",
    choiceA: "HyperText Markup Language",
    choiceB: "Hyper Text Language",
    choiceC: "Language HyperText",
    correct: "A",
  },
  {
    question: "What does CSS stand for?",
    img: "img/css.png",
    choiceA: "Cascading Style Some",
    choiceB: "Cascading Sheets Style",
    choiceC: "Cascading Style Sheets",
    correct: "C",
  },
  {
    question: "What does JS stand for?",
    img: "img/js.png",
    choiceA: "JavaSun",
    choiceB: "JavaScript",
    choiceC: "JavaSon",
    correct: "B"
  },
];

//
//Creates Some Variables
const lastQuestion = questions.length - 1;
let TIMER;
let count = 0;
let questionTime = 10;
let gaugeWidth = 150;
let gaugeUnit = gaugeWidth / questionTime;
let score = 0;

//
//Track Current Question
let runningQuestion = 0;
//Render Question to the User
function renderQuestion() {
  let q = questions[runningQuestion];
  questionElement.innerHTML = `<p>${q.question}</p>`;
  qImgElement.innerHTML = `<img src=${q.img}></img`;
  choiceAElement.innerHTML = `${q.choiceA}`;
  choiceBElement.innerHTML = `${q.choiceB};`;
  choiceCElement.innerHTML = `${q.choiceC};`;
}


//
//When click on startDivElement then display Quiz Section
startElement.addEventListener("click", startQuiz);

function startQuiz() {
  //Before displaying our questions hide startDiv
  startElement.style.display = "none";
  renderQuestion();
  quizElement.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

//
//Render Progress dot
function renderProgress() {
  for (let index = 0; index <= lastQuestion; index++) {
    //Addition Assignment Operator(+=)
    progressElement.innerHTML += `<div class="prog" id="${index}"></div>`;
  }
}

//
//Time Counter
//Per Second Increment width px also increment
function renderCounter() {
  if (count <= questionTime) {
    counterElement.innerHTML = count;
    timeGaugeElement.style.width = gaugeUnit * count + "px";
    count++;
  } else {
    count = 0;
    //Display color of left Question
    answerIsWrong();
    //If time exceed than 10sec display nextQuestion
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      //end the quiz and display scoreSection.
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

//
//Check Answer
function checkAnswer(answer) {
  if (answer === questions[runningQuestion].correct) {
    //Answer is Right
    //Increment Score
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();

  }
  //Move To Next Question if right,wrong,left.
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    //end the Quiz and show scoreSection.
    clearInterval(TIMER);
    scoreRender();
  }
}

function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "green";
}

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "red";
}
//
//endQuiz and render scoreSection
function scoreRender() {
  //calculate total percent of question answer by user
  scoreContainerElement.style.display = "block";
  const scorePercent = Math.round(score * 100 / questions.length);
  const img = (scorePercent >= 80) ? "img/5.png" :
    (scorePercent >= 60) ? "img/4.png" :
    (scorePercent >= 40) ? "img/3.png" :
    (scorePercent >= 20) ? "img/2.png" : "img/1.png";

  scoreContainerElement.innerHTML = `<img src=${img}>`;
  scoreContainerElement.innerHTML += `<p>${scorePercent}%`;
}
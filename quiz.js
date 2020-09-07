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
let questions = [
  {
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
  },
];

//Creates Some Variables
const lastQuestion = questions.length - 1;
let TIMER;
let count = 0;
let questionTime = 10;
let gaugeWidth = 150;
let gaugeUnit = gaugeWidth / questionTime;

//Track Current Question
let runningQuestion = 0;
//Render Question to the User
function renderQuestion() {
  let q = questions[0];
  questionElement.innerHTML = `<p>${q.question}</p>`;
  qImgElement.innerHTML = `<img src=${q.img}></img`;
  choiceAElement.innerHTML = `${q.choiceA}`;
  choiceBElement.innerHTML = `${q.choiceB};`;
  choiceCElement.innerHTML = `${q.choiceC};`;
}

//When click on startDivElement then display Quiz Section
startElement.addEventListener("click", startQuiz);
function startQuiz() {
  //Before displaying our questions hide startDiv
  startElement.style.display = "none";
  renderQuestion();
  quizElement.style.display = "block";
  renderProgress();
  TIMER = setInterval(renderCounter, 1000);
}

//Render Progress dot
function renderProgress() {
  for (let index = 0; index <= lastQuestion; index++) {
    //Addition Assignment Operator(+=)
    progressElement.innerHTML += `<div class="prog" id="${index}"></div>`;
  }
}

//Time Counter
//Per Second Increment width px also increment
function renderCounter() {
  if (count <= questionTime) {
    counterElement.innerHTML = count;
    timeGaugeElement.style.width = gaugeUnit * count + "px";
    count++;
  } else {
    count = 0;
  }
}

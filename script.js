// GETTING ALL ELEMENTS IN THE HTML
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// CREATE QUESTIONS
let questions = [{
        question: "What does HTML stand for?",
        imgSrc: "img/html.png",
        choiceA: "Hypertext Markup Language",
        choiceB: "Hypertex Mark Language",
        choiceC: "I dont know",
        correct: "A"
    }, {
        question: "What does CSS stand for?",
        imgSrc: "img/css.png",
        choiceA: "Cascading Style Sheet",
        choiceB: "Cascading Style Sheets",
        choiceC: "I don't know",
        correct: "B"
    }, {
        question: "What does JS stand for?",
        imgSrc: "img/js.png",
        choiceA: "Just Saying",
        choiceB: "What was the question",
        choiceC: "JavaScript",
        correct: "C"
    },
    {
        question: "What is a variable in Javascript?",
        imgSrc: "img/js.png",
        choiceA: "Variable means anything that can vary",
        choiceB: "What is a variable?",
        choiceC: "Is this a science question?",
        correct: "A"
    },
    {
        question: "Would you rather have all farts be silent but EXTREMELY deadly, or all farts be harmless but EXTREMELY loud?",
        choiceA: "all farts be silent but EXTREMELY deadly",
        choiceB: "all farts be harmless but EXTREMELY loud",
        choiceC: "I'm done",
        correct: "C"
    }
];

// create some variables
// gets the questions, minus 1
const lastQuestion = questions.length - 1;
// keeps track on the question we are on
let onQ = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
// 
const gaugeUnit = gaugeWidth / questionTime;
// this is our timer
let TIMER;
// Score will be set to 0
let score = 0;

// render a question
function renderQuestion() {
    // making the variable q so that we dont have to type in this line again
    let q = questions[onQ];

    // Insert each question "p" element to the HTML
    question.innerHTML = "<p>" + q.question + "</p>";
    // changes the image in the HTML
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    // gets the choices
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

// starts quiz when start quiz is clicked
start.addEventListener("click", startQuiz);

// start quiz function, starts the quiz after the start quiz button is clicked
function startQuiz() {
    // blocks the start button
    start.style.display = "none";
    // renders the function
    renderQuestion();
    quiz.style.display = "block";
    // renders the progress function
    renderProgress();
    // renders the renderCounter function
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    // loops through and renders the progress
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// RENDER COUNTER FUNCTION
function renderCounter() {
    // questions time is 10 seconds
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // This changes the progress color to red
        answerIsWrong();
        if (onQ < lastQuestion) {
            // increment the question when done
            onQ++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    if (answer == questions[onQ].correct) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (onQ < lastQuestion) {
        onQ++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(onQ).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(onQ).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
        (scorePerCent >= 40) ? "img/3.png" :
        (scorePerCent >= 20) ? "img/2.png" :
        "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}
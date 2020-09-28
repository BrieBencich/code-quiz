// for quiz var 
var currentQuestionIndex = 0;




//var to use 
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");


function startQuiz() {
    var starScreenEl = document.getElementById("start-quiz");
    starScreenzEl.setAttribute("class", "hide");

    //questions 
    questionsEl.removeAtrribute("class"); 

    //start the clock 
    timerId = setInterval(clockTick, 1000);

    //show the time 
    timerEl.textContent = time;

    getQuestion(); 

}

// question choices / answers
var questions = [
    {
        title: "If you type the following code in the console window, what will you get ? : 3>2>1===false;",
        choices: ["true, false"],
        answer: "true"
    },

    {
        title: "JavaScript is a _____ -side programming language.",
        choices: ["client, server, both, none"],
        answer: "both"
    },
    {
        title: "How do you find the minimum of x and y using JavaScript?",
        choices: [" min(x,y), Math.min(x,y), min(xy)"],
        answer: "Math.min(x,y)"
    },

    {
        title: "Which JavaScript label catches all the values, except for the ones specified?",
        choices: [" catch, label, try, default "],
        answer: "default"
    }


];

function getQuestion() {
    //get the questions 
    var currentQuestion = questions[currentQuestionsIndex];
    titleEl.textContent = currentQuestion.title; 

    // get new question 
    var titleEl = documenet.getElementById("questions-title");
    titleEl.textContent = currenentQuestion.title;

    //buttons for the choices 
    var choiceNode = documenet.createElement("button");
    choiceNode.setAttribute("class", "choices");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + "." + choice;

    // event listener to each choice 
    choiceNode/onclick = questionClick;

    choicesEl.appendChild(choiceNode);
}

function questionClick() {
    // see if its wrong 
    if (this.value !== questions[currentQuestionIndex].answer) {
        // if wrong deduct 15 seconds
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        feedbacEl.textContent = "Wrong";
    }
    else {
        feedbackEl.textContent = "Correct";

    }
}

// go to the next question 
currentQuestionIndex++;

// Quiz End 
function quizEnd() {
    clearInterval(timerId);

    //show last page 
    var lastPageEl = document.getElementById("finalscore");
    finalscoreEl.textContent = time;
}

//Save your highscore 
function saveHighscore() {
    var initials = initialsEl.value.trim();


    // Save for new users 
    var newScore = {
        score: time,
        initials: initials
    };

    // Save to localstorage 
    highscores.push(newScore);
    window.localStorage.setItem("highscore", JSON.stringify(highscore));
}
//submitting initials
submitBtn.onclick = saveHighscore;


//start button on click 
startBtn.onClick = startQuiz;

//get highscores

function printHighscore() {



    //show the highscore 
    var olEl = document.getElementById("highscores");
    window.location.reload();

    //clear the highscore

    documenet.getElementByID("clear").oneclick = clearHighscores;
}







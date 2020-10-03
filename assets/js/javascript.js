// question choices / answers
var questions = [
    {
        title: "If you type the following code in the console window, what will you get ? : 3>2>1===false;",
        choices: ["true", "false"],
        answer: "true"
    },

    {
        title: "JavaScript is a _____ -side programming language.",
        choices: ["client", "server", "both", "none"],
        answer: "both"
    },
    {
        title: "How do you find the minimum of x and y using JavaScript?",
        choices: ["min(x,y)", "Math.min(x,y)", "min(xy)"],
        answer: "Math.min(x,y)"
    },

    {
        title: "Which JavaScript label catches all the values, except for the ones specified?",
        choices: ["catch", "label", "try", "default"],
        answer: "default"
    }


];

// for quiz var
var time = 15* questions.length; 
var currentQuestionsIndex = 0;
var timerId;






//var to use 
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initalsEl = document.getElementById("initials");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("time");
var questionsEl = document.getElementById("questions");
var feedbackEl = document.getElementById("feedback");
var endScreenEl = document.getElementById("end-screen");



function startQuiz() {
    // hide start screen 
    var starScreenEl = document.getElementById("start-screen");
    starScreenEl.setAttribute("class", "hide");

    // un-hide questions section 
    questionsEl.removeAttribute("class", "hide");


    //start the clock 
    timerId = setInterval(clockTick, 1000);

    //show the time 
    timerEl.textContent = time;

    getQuestion();

}



function getQuestion() {
    //get the questions 
    var currentQuestion = questions[currentQuestionsIndex];


    // get new question 
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = ""

    //buttons for the choices
    currentQuestion.choices.forEach(function (choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + "." + choice;

        // event listener to each choice 
        choiceNode.onclick = questionClick;

        // display on page 
        choicesEl.appendChild(choiceNode);
    });

}


function questionClick() {
    // see if its wrong 
    if (this.value !== questions[currentQuestionsIndex].answer) {
        // if wrong deduct 15 seconds
        time -= 15;

        if (time < 0) {
            time = 0;

        quizEnd()
        }



        feedbackEl.textContent = "Wrong";
    }
    else {
        feedbackEl.textContent = "Correct";

    }


    // go to the next question 
    currentQuestionsIndex++;

    if (currentQuestionsIndex === questions.length) { 
        quizEnd(); 
    } else { 
        getQuestion(); 
    
    }
}
    




function quizEnd() {
    //stop timer 
    clearInterval(timerId);

    //show last page 
    endScreenEl.removeAttribute("class"); 

    questionsEl.setAttribute("class", "hide"); 
    
   



    // show final score 
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
}


function clockTick() {
    //update time 
    time--;
    timerEl.textContent = time;

    if (time <= 0 ) { 
        quizEnd()

    }
}

function saveHighscore() {
    // get value of input box 
    var initials = initalsEl.value.trim();

    //get saved scores from localstorage 
    var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];

    //format new score
    var newScore = {
        score: time,
        initials: initials


    };


    //save to local storage 
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    endScreenEl.setAttribute("class", "hide")
    var highscoreEl = document.getElementById("highscore-section")
    highscoreEl.removeAttribute("class")
    

 
}

// user clicks button to submit initials 
submitBtn.onclick = saveHighscore;

//user clicks button to start quiz
startBtn.onclick = startQuiz;

function printHighscores() {
    //get scores from localstorgae 
    var highscores = JSON.parseIwindow.localStorage.getItem("highscores") || [];

    highscores.forEach(function(score) { 
        //create li tag for each score 
        var liTag = document.createElement("li"); 
        liTag.textContent = score.initials + " - " + score.score; 
        

        //dispaly on page
        var olEl = documenet.getElementById("highscore-section"); 
        olEl.appendChild(liTag); 


    }); 
}

function clearHighscore(){ 
    window.localStorage.removeItem("highscore-section"); 
    window.location.reload(); 
}

document.getElementById("clear").onclick = clearHighscore ; 

//run function when page laods 
printHighscores(); 







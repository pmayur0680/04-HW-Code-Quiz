const btnstartquiz = document.querySelector("#startquiz")
const quizsection = document.querySelector(".quizsection")
const timerEl = document.querySelector('#countdown');

let timerInterval;
let quizQuestions;
let secondsLeft;

// Build quiz 
function buildQuizGame()
{
    // start timer, present question #1

    let toalQuestions = quizQuestions.length;
    // start timer
    timerInterval = setInterval(function() {            
        timerEl.textContent = secondsLeft + ' seconds remaining';              
        secondsLeft--;
        if(secondsLeft === 0) {
          // Stops execution of action at set interval
          clearInterval(timerInterval);
          // Calls function to end the game
          endthegame();
        }        
    }, 1000);
}

// listener for button Start Quiz that will build the quiz
btnstartquiz.addEventListener("click", function(){
    buildQuizGame();
})

// fires when the page is loaded 
function init() {  

  secondsLeft = 10*60; // 10 minutes to answer all questions
    // Array will hold questions, answers, and correct answer
  quizQuestions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: {
            a: "<js>",
            b: "<script>",
            c: "<javascript>"
        },
        coorectAnswer: "b"
    },
    {
        question: "What is the correct syntax for referring to an external script called \"xxx.js?\"",
        answer: {
            a: "<script href='xxx.js'",
            b: "<script name='xxx.js'",
            c: "<script src='xxx.js'",
        },
        coorectAnswer: "c"
    },
    {
        question: "How do you create a function in JavaScript?",
        answer: {
            a: "function myFunction()",
            b: "function = myFunction()",
            c: "function:myFunction()"
        },
        coorectAnswer: "a"
    },
    {
        question: "How do you call a function named \"myFunction\"?",
        answer: {
            a: "call function myFunction()",
            b: "myFunction()",
            c: "call myFunction()"
        },
        coorectAnswer: "b"
    }
];
}    
init();
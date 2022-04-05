const btnstartquiz = document.querySelector("#startquiz")
const quizsection = document.querySelector(".quizsection")
const timerEl = document.querySelector('#countdown');
const frmcodequiz = document.querySelector("#frmcodequiz");
const containeruseroptions = document.querySelector("#containeruseroptions");

let timerInterval;
let quizQuestions;
let secondsLeft;
let userselectedanswers = [];

// Build quiz 
function buildQuizGame()
{    
    let toalQuestions = quizQuestions.length;
    // append question#1 to form
    addquestiontoform(0);
    // start timer
    // timerInterval = setInterval(function() {            
    //     timerEl.textContent = secondsLeft + ' seconds remaining';              
    //     secondsLeft--;
    //     if(secondsLeft === 0) {
    //       // Stops execution of action at set interval
    //       clearInterval(timerInterval);
    //       // Calls function to end the game
    //       endthegame();
    //     }        
    // }, 1000);
}
// append questions one by one to frmcodequiz
function addquestiontoform(index)
{
    if(index>0)
    containeruseroptions.innerHTML='';    // Clear screen
    
    // prompt new question to user
    let questionHeadingEl = document.createElement("h2");
    questionHeadingEl.textContent = quizQuestions[index].question; 
    containeruseroptions.append(questionHeadingEl);

    // prompt list of answer choice to user
    let answerchoiceol =  document.createElement("ol");
    for (const key in quizQuestions[index].answers) {
        //console.log(`${key}: ${quizQuestions[index].answers[key]}`);
        let answerchoiceli = document.createElement("li");
        answerchoiceli.setAttribute("id", index + "|" + key);
        answerchoiceli.textContent = quizQuestions[index].answers[key];        
        answerchoiceli.addEventListener("click", validateresponse)
        answerchoiceol.appendChild(answerchoiceli);
    }
    containeruseroptions.append(answerchoiceol);    
}

// Check for answer and move to next question or end game
function validateresponse(event)
{ 
    // fetch user selected answer and store in userselectedanswers array
     let indexpluskey = this.id.split("|");
     let questionno = indexpluskey[0];
     let useranswer = indexpluskey[1];
     userselectedanswers[questionno] = useranswer;
     
     // check if questions left move to next or end game
      if(questionno<(userselectedanswers.length-1))      
      addquestiontoform(++questionno)
      else
      endthegame();     
}

// end the game by
function endthegame()
{
    containeruseroptions.innerHTML='';    // Clear screen 
}

// listener for button Start Quiz that will build the quiz
btnstartquiz.addEventListener("click", function(){
    this.style.display='none'; 
    quizsection.style.display='block';
    buildQuizGame();
})

// fires when the page is loaded 
function init() {  

  secondsLeft = 10*60; // 10 minutes to answer all questions
    // Array will hold questions, answers, and correct answer
  quizQuestions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "<js>",
            b: "<script>",
            c: "<javascript>"
        },
        coorectAnswer: "b"
    },
    {
        question: "What is the correct syntax for referring to an external script called \"xxx.js?\"",
        answers: {
            a: "<script href='xxx.js'",
            b: "<script name='xxx.js'",
            c: "<script src='xxx.js'",
        },
        coorectAnswer: "c"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: {
            a: "function myFunction()",
            b: "function = myFunction()",
            c: "function:myFunction()"
        },
        coorectAnswer: "a"
    },
    {
        question: "How do you call a function named \"myFunction\"?",
        answers: {
            a: "call function myFunction()",
            b: "myFunction()",
            c: "call myFunction()"
        },
        coorectAnswer: "b"
    }
];
 // create empty array for user answers that will replace as user answer each questions
 for(let i=0; i< quizQuestions.length; i++)
 userselectedanswers.push('');
}    
init();
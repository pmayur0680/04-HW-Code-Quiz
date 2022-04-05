const btnstartquiz = document.querySelector("#startquiz")
const quizsection = document.querySelector(".quizsection")
const timerEl = document.querySelector('#countdown');
const frmcodequiz = document.querySelector("#frmcodequiz");
const userinitialsblock = document.querySelector("#userinitialsblock");
const txtuserinital = document.querySelector("#txtuserinital");
const btnsubmit = document.querySelector("#btnsubmit");
const containeruseroptions = document.querySelector("#containeruseroptions");

let timerInterval;
let quizQuestions;
let secondsLeft;
let userselectedanswers = [];
let userscore;
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
     // add hr and correct/wrong answer status
     let hrEl = document.createElement("hr");
     containeruseroptions.append(hrEl);    
     let divEl = document.createElement("div");
     if(useranswer==quizQuestions[questionno].coorectAnswer)
     divEl.textContent = "Correct!";        
     else
     divEl.textContent = "Wrong!";        
     containeruseroptions.append(divEl);   
     // timeout so user will have time to see correct/wrong answer status
     setTimeout(function(){
         // check if questions left move to next or end game
      if(questionno<(userselectedanswers.length-1))      
      addquestiontoform(++questionno)
      else
      endthegame();     
     }, 300);
     
}

// end the game by calculating score and asking for user intials
function endthegame()
{
    containeruseroptions.innerHTML='';    // Clear screen 
    // find total correct answers
    let totalquestions = quizQuestions.length;
    let correctanswers = 0;
    for(let i=0; i< totalquestions; i++)
    {
        if(userselectedanswers[i]==quizQuestions[i].coorectAnswer)
        correctanswers++;
    }
    // find score percentage
    userscore = (correctanswers/totalquestions)*100;

    let HeadingEl = document.createElement("h2");
    HeadingEl.textContent = "All done!"; 
    containeruseroptions.append(HeadingEl);

    let scoreEl = document.createElement("p");
    scoreEl.textContent = "Your final score is "+userscore+"%."; 
    containeruseroptions.append(scoreEl);
    // display section to accept user initials
    userinitialsblock.style.display='block';
}
// listener for submit button for form user intials
btnsubmit.addEventListener("click", function(event){
    event.preventDefault();
    if(txtuserinital.value=="")
    alert("Please enter your initals!");
    else
    saveuserscore(txtuserinital.value);
})
// show user initials and score 
function saveuserscore(valuserinitial)
{
    containeruseroptions.innerHTML='';    // Clear screen 
    // hide section that accept user initials
    userinitialsblock.style.display='none';
    // show highscores
    let HeadingEl = document.createElement("h2");
    HeadingEl.textContent = "Highscores"; 
    containeruseroptions.append(HeadingEl);

    let scoreEl = document.createElement("p");
    scoreEl.textContent = valuserinitial +" - " + userscore + "%"; 
    containeruseroptions.append(scoreEl);
}
// listener for button 'Start Quiz' that will call buildQuizGame
btnstartquiz.addEventListener("click", function(){
    this.style.display='none'; 
    quizsection.style.display='block';    
    buildQuizGame();
})

// fires when the page is loaded 
function init() {  

  secondsLeft = 10*60; // 10 minutes to answer all questions
    // Array will hold questions, answers, and correct answer objects
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
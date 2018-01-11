$(document).ready(function() {

// main game app object
var game = {
    time: 12,
    answerTime: 4,
    // choices: $("<button>").addClass("answers"),

    // array of objects containing questions, choices and answers
    trivia: [
        {   question: "Champagne is a sparkling wine made from grapes grown in the Champagne region of which country?",
            choices: ["Belgium", "France", "Denmark", "Algeria"],
            answer: 1
        },
        {   question: "In which country did cheddar cheese originate?",
            choices: ["England", "United States", "Spain", "Sweden"],
            answer: 0
        },
        
    ]

};

// default time variables
var timeLeft = 12;
var answerTime = 3;
var intervalId;
var clockRunning = false;

// game variables
var question = 0;
var correct = 0;
var wrong = 0;

// create a button with return value of that new button-----------
function createButton (buttonText, className) {
    let newButton = $("<button>");
    newButton.addClass(className);
    newButton.text(buttonText);
    return newButton
}

// below are all timer related functions--------------------------
function decrementSecond() {
    if (timeLeft > 0){
        timeLeft --;
        $("#time-left").text(timeLeft);
    }
    else {
        resetTimers()
    }
}
function resetTimers(){
    timeLeft = 12;
    answerTime = 3
    $("#questions").empty();
}
function run() {
    intervalId = setInterval(decrementSecond, 1000);
}

//--------------CREATE CLICK BUTTON & FUNCTION TO START GAME----------------//

// --create/append button here--
$("#interaction").append(createButton("START","start"));

// give button function
$(".start").on("click",function(){
    // run();
    nextQuestion();
});

// ---function to display correct answer ---
function answerDisplay(n) {
    if (parseInt($(this).attr("choice-number")) === game.trivia[n].answer) {
        
        correct ++;
        nextQuestion();
    }
    else {
        alert("Sorry, the correct answer was " + game.trivia[n].choices[game.trivia[n].answer]);
        wrong ++;
        nextQuestion();
    }
}


// ----- function to display a single question with its options -----
function choicesDisplay (n) {
    // loop through options and create buttons
    for (var i=0; i < game.trivia[n].choices.length; i++){
        let currentButton = createButton(game.trivia[n].choices[i], "choices");
        currentButton.attr("choice-number",i);
        $("#questions").append(currentButton);
    }
     // this click will check which button you clicked to make sure it matches with 
    $(".choices").on("click",function(){
        // determine if the button clicked is correct or not
        answerDisplay(n);
    });
}
// ----using choiceDisplay to loop through the choices for the current question and displaying it all-----
function nextQuestion () {
    if (question < game.trivia.length){
        $("#questions").empty();
        $("#questions").append(game.trivia[question].question);
        choicesDisplay(question);
        question ++;
    }
    else if (question === game.trivia.length){
        $("#questions").empty();
        $("#questions").append("That's it, good job"+"<br>");
        $("#questions").append("you got "+ correct +" right");
        $("#questions").append("you got "+ wrong +" wrong");
    }
}



}); //<----- last line for when whole app.js is loaded
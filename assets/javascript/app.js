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
var timeLeft = 2;
var answerTime = 2;
var answerTimer;
var gameTimer;
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

//------------ BELOW ARE THE TIME RELATED FUNCTIONS -------------//


// ****************************************************************//


//--------------CREATE CLICK BUTTON & FUNCTION TO START GAME----------------//
// --create/append button here--
var startButtonBool = false;
function makeStartButton () {
$("#interaction").append(createButton("START","start"));
startButtonBool = true;
}
makeStartButton();

// gives start button function
$(".start").on("click",function(){
    if (startButtonBool === true){
        startButtonBool = false;
        $("#interaction").empty();
    }
    nextQuestion();
    runGameTime();
});
// *************************************************************************


// --------FUNCTION TO DISPLAY A SINGLE QUESTION WITH ITS OPTIONS -----------------------------------//
function choicesDisplay (n) {
    // loop through options and create buttons
    for (var i=0; i < game.trivia[n].choices.length; i++){
        let currentButton = createButton(game.trivia[n].choices[i], "choices");
        currentButton.attr("choice-number",i);
        $("#questions").append(currentButton);
    }

    //  THIS CLICK WILL CHECK WHICH BUTTON YOU CLICKED TO MAKE SURE IT MATCHES THE CORRECT ANSWER FROM GAME OBJECT
    $(".choices").on("click",function(){
        // determine if the button clicked is correct or not
        if (parseInt($(this).attr("choice-number")) === game.trivia[n].answer) {
            $("questions").empty();
            $("questions").text("nailed it sucker!");
            correct ++;
            console.log("inside correct answer");
            runAnswerTime();
        }
        // if answer chosen is wrong or time runs out
        else if (parseInt($(this).attr("choice-number")) !== game.trivia[n].answer || timeLeft === 0) {
            wrong ++;
            console.log("inside wrong answer");
            $("questions").empty();
            $("questions").text("Sorry, the correct answer was " + game.trivia[n].choices[game.trivia[n].answer]);
            runAnswerTime();
        }
    });
}
// *****************************************************************************************************//

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
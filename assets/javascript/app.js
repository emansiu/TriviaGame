// default time variables
var timeLeft = 4;
var answerTime = 3;
var intervalId;
var go = true;

// create a button
function createButton (buttonText, className) {
    let newButton = $("<button>");
    newButton.addClass(className);
    newButton.text(buttonText);
    return newButton
}

$(document).ready(function() {
    
    $("#questions").append(createButton("test","choices"));
    $("#questions").append(createButton("another","choices"));
});

// main game app object
var game = {
    time: 30,
    timeForAnswer: 4,

    // array of objects which are the trivia questions, choices and answer
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

console.log (game.trivia[0].question);
console.log (game.trivia[0].choices[0]);
console.log (game.trivia[0].choices[1]);
console.log (game.trivia[0].choices[2]);
console.log (game.trivia[0].choices[3]);
console.log ("the answer is " + game.trivia[0].choices[game.trivia[0].answer]);
console.log (game.trivia[1].question);
console.log (game.trivia[1].choices[0]);
console.log (game.trivia[1].choices[1]);
console.log (game.trivia[1].choices[2]);
console.log (game.trivia[1].choices[3]);
console.log ("the answer is " + game.trivia[1].choices[game.trivia[1].answer]);





function timer() {
    if (timeLeft > 0){
        timeLeft --;
        $("#time-left").text(timeLeft);
    }
}

function run() {
    intervalId = setInterval(timer, 1000);
}
function resetTime (){
    timeLeft = 14;
}

$(".submit").on(C)
run();
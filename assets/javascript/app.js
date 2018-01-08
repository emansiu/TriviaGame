// default time variables
var timeLeft = 30;
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
    
    $("#questions").append(createButton("test","answers"));
    $("#questions").append(createButton("another","answers"));
});
// main game app object
var game = {
    time: 30,
    break: 4,
    // choices: $("<button>").addClass("answers"),

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




// stuff that works for testing
// function count() {
//     timeLeft --;
//     $("#time-left").text(timeLeft);
// }

// function run() {
//     intervalId = setInterval(count, 1000);
// }

// run();
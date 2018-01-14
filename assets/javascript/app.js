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
    // default time variables
    var timeLeft = 2;
    var answerTime = 2;
    var answerTimer;
    var gameTimer;
    var clockRunning = false;

    function decrementTime(){
        if (timeLeft > 0){
            timeLeft --;
            $("#time-left").text(timeLeft);
            getTime();
        }
        else if (timeLeft === 0){
           
        }
    }
    function runTimer(){
        gameTimer = setInterval(decrementTime, 1000);
    }

    function getTime (){
        return timeLeft;
    }
    
    // ****************************************************************//


    //--------------CREATE START BUTTON & FUNCTION TO START GAME----------------//
    // --create/append button here--
    var startButtonBool = false;

    function makeStartButton () {
        $("#interaction").append(createButton("START","start"));
        startButtonBool = true;
    }

    makeStartButton();
    // set up variable to determing if you are in a question or not
    var inQuestion = false;

    // gives start button function
    $(".start").on("click",function(){
        if (startButtonBool === true){
            startButtonBool = false;
            $("#interaction").empty();
        }
        $("#questions").append(game.trivia[question].question);
        choicesDisplay(question);
        runTimer();
        inQuestion = true;
    });
    // *************************************************************************//

    //--- GAME FUNCTION TO PROGRESS THROUGH ---
    //  THIS CLICK WILL CHECK WHICH BUTTON YOU CLICKED TO MAKE SURE IT MATCHES THE CORRECT ANSWER FROM GAME OBJECT
    $(document).on("click", ".choices", function(){
        // determine if the button clicked is correct or not
        if (parseInt($(this).attr("choice-number")) === game.trivia[question].answer) {
            correct ++;
            displayAnswer("right");
            inQuestion = false;
        }
        // if answer chosen is wrong or time runs out
        else if (parseInt($(this).attr("choice-number")) !== game.trivia[question].answer) {
            wrong ++;
            displayAnswer("wrong", game.trivia[question].choices[game.trivia[question].answer]);
            inQuestion = false;
        }
    });
   if (getTime() === 0){
       alert ("you did you sap");
   }
    // *************************************************************************************************************//

    // ----FUNCTION TO DISPLAY THE ANSWER WITH PARAMETER FOR RIGHT OR WRONG AND A PARAMETER FOR RIGHT ANSWER

    function displayAnswer(rightOrWrong, correctAnswer) {
        if (rightOrWrong === "right"){
            $("#questions").empty();
            $("#questions").text("nice work, keep it up!");
        }
        else {
            $("#questions").empty();
            $("#questions").text("Sorry, the correct answer was " + correctAnswer);
        }
    }

    // ***************************************************************************************************

    // --------FUNCTION TO DISPLAY A SINGLE QUESTION WITH ITS OPTIONS -----------------------------------//
    function choicesDisplay (n) {
        // loop through options and create buttons
        for (var i=0; i < game.trivia[n].choices.length; i++){
            let currentButton = createButton(game.trivia[n].choices[i], "choices");
            currentButton.attr("choice-number",i);
            $("#questions").append(currentButton);
        } 
    }
    // *****************************************************************************************************//

    // ----using choiceDisplay to loop through the choices for the current question and displaying it all-----
    function nextQuestion () {
        if (question < game.trivia.length - 1) {
            question ++;
            $("#questions").empty();
            $("#questions").append(game.trivia[question].question);
            choicesDisplay(question);
        }
        else if (question === game.trivia.length -1){
            $("#questions").empty();
            $("#questions").append("That's it, good job"+"<br>");
            $("#questions").append("you got "+ correct +" right");
            $("#questions").append("you got "+ wrong +" wrong");
        }
    }

}); //<----- last line for when whole app.js is loaded
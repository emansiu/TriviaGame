$(document).ready(function() {

    // main game app object
    var game = {
        time: 12,
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
            {   question: "Arby's is a fast-food restaurant chain specializing in sandwiches made with what main ingredient?",
                choices: ["Auju Sauce", "Himalayan Ham", "Roast Beef", "Roasted Chicken"],
                answer: 2
            },
            {   question: "What is the main ingredient in thousand island dressing?",
                choices: ["Mayonnaise", "lard", "lime-juice", "dijon-mustard"],
                answer: 0
            },
            {   question: `Traditionally, the term "caviar" refers to the salt-cured roe of which fish?`,
                choices: ["Carp", "Tuna", "Bass", "Sturgeon"],
                answer: 3
            },
            {   question: "Mexican tortillas were originally made from the grain of which plant?",
                choices: ["oat", "corn", "rye", "wheat"],
                answer: 1
            },
            {   question: "What dish, made from crushed durum wheat, is a staple of western North Africa?",
                choices: ["couscous", "millet", "black rice", "quinoa"],
                answer: 0
            },
            {   question: "Celebrity chef Gordon Ramsay opened his first restaurant in what city?",
                choices: ["New York, New York", "Paris, France", "London, England", "Amsterdam, Netherlands"],
                answer: 2
            },
            {   question: "Sushi is a type of cuisine that originated in what country?",
                choices: ["China", "Korea", "Japan", "Thailand"],
                answer: 2
            },
            {   question: "What is the name for a meat dish made from finely chopped raw beef often served with onion, capers, seasonings and raw egg?",
                choices: ["Steak-frites", "faux gras", "Jambon-beurre", "Steak Tartare"],
                answer: 3
            },
            {   question: "To be legally sold as bourbon, a whiskey's mash must contain at least 51% of what grain?",
                choices: ["corn", "buckwheat", "spelt", "finger millet"],
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
    var timeLeft = 10;
    var gameTimer;

    function decrementTime(){
        if (timeLeft > 0){
            timeLeft --;
            $("#time-left").text(timeLeft);
        }
        else if (timeLeft === 0){
            clearInterval(gameTimer);
            wrong ++;
            timeLeft = 10;
            displayAnswer("wrong", game.trivia[question].choices[game.trivia[question].answer]);
            setTimeout(nextQuestion, 3000);
        }
    }
    function runTimer(){
        gameTimer = setInterval(decrementTime, 1000);
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
    $(document).on("click", ".start",function(){
        if (startButtonBool === true){
            startButtonBool = false;
            $("#interaction").empty();
            $("#questions").empty();
        }
        $("#time-left").text(timeLeft);
        $("#questions").append("<p>" + game.trivia[question].question + "</p>");
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
            clearInterval(gameTimer);
            timeLeft = 10;
            displayAnswer("right");
            setTimeout(nextQuestion, 2000);
        }
        // if answer chosen is wrong or time runs out
        else if (parseInt($(this).attr("choice-number")) !== game.trivia[question].answer) {
            wrong ++;
            clearInterval(gameTimer);
            timeLeft = 10;
            displayAnswer("wrong", game.trivia[question].choices[game.trivia[question].answer]);
            setTimeout(nextQuestion, 3000);
        }
    });
   
    // *************************************************************************************************************//

    // ----FUNCTION TO DISPLAY THE ANSWER WITH PARAMETER FOR RIGHT OR WRONG AND A PARAMETER FOR RIGHT ANSWER

    function displayAnswer(rightOrWrong, correctAnswer) {
        if (rightOrWrong === "right"){
            $("#questions").empty();
            $("#questions").html("<h2>" + "nice work, keep at it!" + "</h2>");
        }
        else {
            $("#questions").empty();
            $("#questions").html("<h2>" + "Sorry, the correct answer was " + correctAnswer + "</h2>");
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
            $("#time-left").text(timeLeft);
            runTimer();
            question ++;
            $("#questions").empty();
            $("#questions").append("<p>" + game.trivia[question].question + "</p>");
            choicesDisplay(question);
        }
        else if (question === game.trivia.length -1){
            $("#questions").empty();
            $("#questions").append("That's it, good job"+"<br>");
            $("#questions").append("you got "+ correct +" right and<br>");
            $("#questions").append("you got "+ wrong +" wrong<br>");
            $("#questions").append("Click below to try again!");
            question = 0;
            correct = 0;
            wrong = 0;
            makeStartButton();
        }
    }

}); //<----- last line for when whole app.js is loaded
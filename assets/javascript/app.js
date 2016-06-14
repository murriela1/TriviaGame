$(document).ready(function(){
$("#startButton").on("click", function(){


        var counter;
        var number = 30;
        $('#stop').on('click', stop);
        $('#resume').on('click', run);
        function run(){
            counter = setInterval(decrement, 1000);
        }
        function decrement(){
            number--;
            $('#show-number').html('<h2>' + number + '</h2>');
            if (number === 0){
                stop();
                alert('Times Up! Click the restart button to try again!!')
            }
        }
        function stop(){
            clearInterval(counter);
        }
        run();


  
var questions = [{
    question: "What is the secret identity of Superman?",
    choices: ["Clark Kent", "Mark Kent", "Clark Wayne", "Jor-El"],
    correctAnswer: 0
}, {
    question: "What is the name of the metal bonded to Wolverine's bones?",
    choices: ["Vibranium", "Adamantium", "Cosmitanium", "Uranium"],
    correctAnswer: 1
}, {
    question: "Captain America fights crime against which evil organization?",
    choices: ["Hydra", "Aryan Brigade", "Revengers", "The U.S. Government"],
    correctAnswer: 0
}, {
    question: "Batman protects which city?",
    choices: ["New York City", "Chicago", "Newark", "Gotham City"],
    correctAnswer: 3
}, {
    question: "Which name has NOT been traditionally associated with Batman?",
    choices: ["The Dark Knight", "The Caped Crusader", "World's Greatest Vigilante", "World's Greatest Detective"],
    correctAnswer: 2
},
    {
    question: "What is Green Lantern's real name?",
    choices: ["Michael Jordan", "Hal Jordan", "Ryan Reynolds", "Hal Parker"],
    correctAnswer: 1
    }]

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
    
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; 
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});


function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    
    $(questionClass).text(question);


    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
    
    clockCounter = 30;
    runClock();
}

var clockCounter = 30;
function runClock(){
    clockCounter -= 1;
    if(clockCounter < 0){
        questionTimedOut();
        clockCounter = 30;
    }
    else{
        setTimeout(runClock(), 1000);
        console.log("Time left:" + clockCounter.toString());
    }
}


function questionTimedOut(){

}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}



    })
})

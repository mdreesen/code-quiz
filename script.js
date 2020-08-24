$(document).ready(function() {
    // Handler for .ready() called.

    var questions = [{
            question: "who is the best boss in the world?",
            a: "Lesli Knope",
            b: "Michael Scott",
            c: "Big Bird",
            correct: "Michael Scott"

        }, {
            question: "Who made the best chili?",
            a: "Kelly",
            b: "Toby",
            c: "Kevin",
            correct: "Kevin"
        },
        {
            question: "Who started the fire?",
            a: "Dwight",
            b: "Ryan",
            c: "Michael",
            correct: "Ryan"
        }
    ]

    var pointer = 0;
    var score = 0;
    var timer = 60;
    var timerId;

    $("#quiz").hide();


    // -=- MADE THIS FUNCTION MYSELF...NOT SURE IF THIS IS RIGHT -=-
    // make a start button, this is what is going to start a quiz
    $('#start').on("click", function() {
        $("#game").hide();
        $('#quiz').show();
        countDown();
        things();
    });
    // use local storage for different high scores, get and set - only do this when the high score is up, at the end of the quiz


    function countDown() {
        timer--;
        $('#time').text(timer);

        if (timer <= 0) {
            clearInterval(timerId);
            // work with timer to make sure quiz stops at 0
            if (timer === 0) {

            }

            // check for high score
        }
    }


    function things() {
        if (questions[pointer].question === undefined) {
            return
        } else {
            $("#question").text(questions[pointer].question)
            $("#1").text(questions[pointer].a)
            $("#2").text(questions[pointer].b)
            $("#3").text(questions[pointer].c)
        };

    }

    // bet practice is to save the username through the localStorage, put it to an array


    // CREAT FUNCTION FOR THE TIMEOUT


    $(".answer").on("click", function() {
        // we wnt logic to check if the answer is right or wrong
        if ($(this).text() === questions[pointer].correct) {
            score++;
            console.log(score);

        } else {
            // need to get rid of time, -10 seconds
            timer -= 10;
        }
        pointer++;

        if (pointer === questions.length) {
            // just display score
            localStorage.setItem('recentScore', score);
            location.replace('highScore.html');
        } else {
            things();
        }
        // pointer++, check if we are equal to the array if statements, then call the function
    })

    function save() {
        var saveInput = $('#userName').val();
        console.log(saveInput);
        var saveFinalScore = localStorage.getItem('recentScore');
        // retreivinng the list of scores from localStorage
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        console.log(saveFinalScore);

        // -=- how to reconfigure, grab by the name of the user and many users that have done the quiz -=-
        //splice(saveFinalScore, saveInput);

        for (var i = 0; i < highScores.length; i++) {
            var p = $('<p>');
            p.text(saveInput);
            p.append(saveFinalScore);
            $('#scoreInfo').append(p);
        }
        localStorage.setItem(saveInput, saveFinalScore);
    }

    $('#saveButton').on("click", function(e) {
        save();
    });

    things();

    timerId = setInterval(countDown, 1000);
    timer === 0, clearInterval();

});
var gamePattern = [];
var userClickedPattern = [];
var buttonColor = ["red","yellow","blue","green"];
var numClicked = 0;
var level = 0;
var gameStart = true;
var ans = true;
// var selectedButton = "."+gamePattern[i];

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    //select id and flash
    var selectedId = "#" + randomChosenColor;
    $(selectedId).fadeIn(100).fadeOut(100).fadeIn(100);

    //play sound
    playSound(randomChosenColor);

    level += 1;
    $("#level-title").text("level "+ level);

    
}

$(".btn").on("click",function(){
    numClicked++;
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if (numClicked === gamePattern.length){
        checkAnswer(numClicked);
    }
})


//sound
function playSound(name){
    // play sound
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play(); 
}

//animation
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


$(document).on("keypress",function(){
    if (gameStart){
        nextSequence();  
    }
    gameStart = false;
})

//function check user input correct or not.

function checkAnswer(currentLevel){
    for (var i = 0; i<currentLevel;i++){
        if (userClickedPattern[i] === gamePattern[i]){
            ans = true;
        } else {
            ans = false;
            break
        }
    }
    if (ans === true){
        console.log("Success!")
        setTimeout(nextSequence(),1000);
        userClickedPattern = [];
        numClicked = 0;
    } else {
        console.log("Wrong!")
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gameStart = true;
    gamePattern = [];
    level = 0;
    userClickedPattern = [];
    numClicked = 0;
}


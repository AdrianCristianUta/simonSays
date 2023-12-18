var identifiers = ["blue", "green", "red", "yellow"];
var gameSequence = [];
var gameIndex = 0;
var level = 1;

$("h1#level-title").text("Click anywhere to begin!");

$(document).on("click", function() {
    $(document).unbind("click");
    $("h1#level-title").text("Press any key to start the game!");
    $(document).on("keydown", keyDwnEventHandler);
});

function keyDwnEventHandler() {
    $(document).unbind("keydown");
    addToSequence();
    playSequence();
    $("div.btn").on("click", btnClkEventHandler);
}

function btnClkEventHandler() {
    $("div.btn").unbind("click");
    let isCorrect = checkIfCorrect(this.id);
    triggerButton(this.id, isCorrect);
    if(isCorrect) {
        continueGame();
    } else {
        lostGame();
    }
}

function checkIfCorrect(element) {
    return element === gameSequence[gameIndex];
}

function continueGame() {
    gameIndex++;
    if(gameIndex == gameSequence.length) {
        level++;
        if(level > 25) {
            $("h1#level-title").text("Congratiulations! You've won the game! Press any key to play again!");
            resetGame(); 
        } else {
            gameIndex = 0;
            addToSequence();
            playSequence();
            $("div.btn").on("click", btnClkEventHandler);
        }
    } else {
        $("div.btn").on("click", btnClkEventHandler);
    }
}


function lostGame() {
    $("h1#level-title").text("Oh no! You got it wrong... Press any key to try again.");
    resetGame();
}

function resetGame() {
    level = 1;
    gameIndex = 0;
    gameSequence = [];
    $(document).on("keydown", keyDwnEventHandler);
}

async function playSequence() {
    $("h1#level-title").text("Level " + level + ". Watch the sequence!");
    for(let i = 0; i < gameSequence.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        triggerButton(gameSequence[i], true);
    }
    $("h1#level-title").text("Level " + level + ". Repeat the sequence!");
}

async function triggerButton(element, isCorrect) {
    if(isCorrect) {
        playSound(element);
    } else {
        playSound("wrong");
    }
    pressButton(element);
}

function addToSequence() {
    let identifierIndex = Math.floor(Math.random() * 4);
    gameSequence.push(identifiers[identifierIndex]);
}

function pressButton(caseIdentifier) {
    $("div#" + caseIdentifier).fadeOut(75).fadeIn(75);
}

function playSound(caseIdentifier) {
    var audio = new Audio("./sounds/" + caseIdentifier+ ".mp3");
    audio.play();
}

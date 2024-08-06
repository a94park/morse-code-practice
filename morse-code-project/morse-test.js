// //how many words can you solve in 30 seconds

// if user input === random morse morseCode
//     score++

// if user input === skip
//     generate new word

// if userinput === wrong 
//     ask skip or try again

// if userinput === quit 
//     show start screen
// let score = 0

// eventlistener click start -> timer starts 
//                                 first word generated
//                                 inputfield generated
//                                 submit button generated
//                                 quit button generated 

// unfinised games will not log the score

// if timer reaches 0 
//     log score
//     announce score


// on start page game should be hidden announce score should be hidden vise versa


const morseCodeMap = {
    "A": ".-",    "B": "-...",  "C": "-.-.",  "D": "-..",
    "E": ".",     "F": "..-.",  "G": "--.",   "H": "....",
    "I": "..",    "J": ".---",  "K": "-.-",   "L": ".-..",
    "M": "--",    "N": "-.",    "O": "---",   "P": ".--.",
    "Q": "--.-",  "R": ".-.",   "S": "...",   "T": "-",
    "U": "..-",   "V": "...-",  "W": ".--",   "X": "-..-",
    "Y": "-.--",  "Z": "--.."
};

let currentWord = "";
let wordsList = [];
let score = 0;
let scores = [4, 5, 2, 4];  //dummy scores for test purpose
let highScoreTracker = 0
let timeLeft = 60;
let timer;

// Fetch the words from the JSON file
fetch('morse-words.json')
    .then(response => response.json())
    .then(data => {
        wordsList = data.words;
        initGame();
    })
    .catch(error => console.error('Error fetching words:', error));

function initGame() {
    // Event listener for the start button
    document.getElementById('startButton').addEventListener('click', startGame);

    // Event listener for the submit button
    document.getElementById('submitButton').addEventListener('click', checkAnswer);

    // Event listener for the skip button
    document.getElementById('skipButton').addEventListener('click', skipWord);

    // Event listener for the quit button
    document.getElementById('quitButton').addEventListener('click', quitGame);

    // Event listener for the restart button
    document.getElementById('restartButton').addEventListener('click', startGame);
}

function startGame() {
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    document.getElementById('endScreen').classList.remove('active');
    score = 0;
    timeLeft = 60;
    updateScore();
    startTimer();
    displayRandomMorse();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    
    clearInterval(timer);
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('endScreen').classList.add('active');
    document.getElementById('finalScore').textContent = score;
    scores.push(score)
    console.log(scores)
    for (i=0; i < scores.length; i++) {
        if (highScoreTracker < scores[i]) {
            highScoreTracker = scores[i]
        }
    }
    updateHScore();
}

function displayRandomMorse() {
    currentWord = getRandomWord();
    const morseCode = textToMorse(currentWord);
    document.getElementById('morseDisplay').textContent = morseCode;
}

function textToMorse(text) {
    return text.split('').map(char => morseCodeMap[char.toUpperCase()] || '').join(' ');
}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomIndex];
}

function checkAnswer() {
    const userInput = document.getElementById('textInput').value.trim().toUpperCase();
    const resultDisplay = document.getElementById('result');

    if (userInput === currentWord) {
        score++;
        updateScore();
        
        resultDisplay.textContent = "Correct!";
        resultDisplay.style.color = "green";
        setTimeout(() => {
            resultDisplay.textContent = '';
            displayRandomMorse();
            document.getElementById('textInput').value = '';
        }, 1000);
    } 
    else {
        resultDisplay.textContent = "Incorrect! Try again or skip.";
        resultDisplay.style.color = "red";
    }
}

function skipWord() {
    document.getElementById('result').textContent = '';
    document.getElementById('textInput').value = '';
    displayRandomMorse();
}

function quitGame() {
    clearInterval(timer);
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
    document.getElementById('textInput').value = '';
    document.getElementById('result').textContent = '';
}

function updateScore() {
    document.getElementById('score').textContent = score;
}
function updateHScore() {
    document.getElementById('hScore').textContent = highScoreTracker;
}









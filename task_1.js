// const prompt = require('prompt-sync')({ sigint: true });
const prompt = require('prompt-sync')();
function generateSecretNumber() {
    let digits = [];
    while (digits.length < 4) {
        let randomDigit = Math.floor(Math.random() * 10).toString();
        if (!digits.includes(randomDigit)) {
            digits.push(randomDigit);
        }
    }
    console.log("Computer Secret Number", digits)
    return digits.join('');
}

function validateGuess(guess) {
    if (guess.length !== 4) return false;
    for (let char of guess) {
        if (!'0123456789'.includes(char)) return false;
    }
    let uniqueDigits = new Set(guess);
    return uniqueDigits.size === 4;
}

function calculateBullsAndCows(secret, guess) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }

    return { bulls, cows };
}

function randomFunnyMessage() {
    let randomMessageArr = ["You Are Bad At Guess", "Do You Want To Crash The GAME !!👀", "Go And Play with Kids !", "No Luck This TIMEEEE ⬇️"]
    let randomIndex = Math.floor(Math.random() * randomMessageArr.length)

    return "~~~" + randomMessageArr[randomIndex] + " ~~~"


}

function checkForNewRound(userName) {

    let choiceFlag = false
    while (true) {

        let userRestartChoice = prompt("Do You Wana Another Round ??? 🔥 Write Yes or No ")
        // console.log("The User Restart Choice", userRestartChoice)
        if (userRestartChoice.toLowerCase() == "yes") {
            choiceFlag = true
            break;

        } else if (userRestartChoice.toLowerCase() == "no") {
            choiceFlag = false
            break;
        } else {
            console.log("Please Enter Properly ", userName)
        }
    }
    return choiceFlag

}

function playGame() {
    let secretNumber = generateSecretNumber();
    let playerName = prompt('What is your name? ')

    if (playerName.length <= 0) {
        playerName = "Player"
    }
    let userDificultLevel = prompt("Choose Difficult Level \n Enter Easy for unlimited Guess Attempts \n Enter Hard For Max 10 Attempts ")
    
    console.log(`Welcome to Bulls and Cows, ${playerName}!`);
    console.log('I have generated a secret 4-digit number. Try to guess it!');

    let attempts = 0;
    while (true) {
        let guess = prompt('Enter your guess: ');

        if (!validateGuess(guess)) {
            console.log('Invalid guess. Please enter a 4-digit number with unique digits.');
            continue;
        }

        attempts++;
        const { bulls, cows } = calculateBullsAndCows(secretNumber, guess);



        if (attempts == 10 && userDificultLevel == "Hard" ) {
            console.log("Maximum Attempts Reached !! ", attempts)
            break;
        }



        if (bulls === 4) {
            console.log(`Congratulations, ${playerName}! You guessed the secret number ${secretNumber} in ${attempts} attempts.`);
            let check = checkForNewRound(playerName)
            // console.log("User Check", check)
            if (!check) {
                break;
            } else {
                console.log("New Secret Generated !!")
                secretNumber = generateSecretNumber()
                attempts = 0
            }
        } else if (bulls === 0 && cows === 0) {

            console.log('No bulls or cows. Try again.');
            let message = playerName + " " + randomFunnyMessage()
            console.log(message)
        } else {
            console.log(`${playerName} Checkout This Hint: ${bulls} bull(s) and ${cows} cow(s)`);
        }
    }
}

playGame();



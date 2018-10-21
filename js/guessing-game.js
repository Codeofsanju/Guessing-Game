/* 
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".
In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
*/

//returns a random number between 1 and 100
function generateWinningNumber(){
    return Math.floor(Math.random() * (100 - 0) + 1);
}

//fisher-yates Shuffle algorithm
function shuffle(arr){
    let i = arr.length-1;
    while(i){
        let randomIndex = Math.floor(Math.random() * (arr.length - 0));
        let temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
        i--;
    }
    return arr;
}

class Game{
    constructor(){
        this.winningNumber = generateWinningNumber();
        this.playersGuess = null;
        this.pastGuesses = [];
    }
    difference(){
        return Math.abs(this.playersGuess-this.winningNumber);
    }
    isLower(){
        return this.playersGuess < this.winningNumber;
    }
    playersGuessSubmission(num){
        console.log("submitted: ", num);
        if(num > 100 || num < 1 || typeof(num) !== 'number'){
            throw 'That is an invalid guess.';
        }
        this.playersGuess = num;
        return this.checkGuess(num);
    }
    checkGuess(){
        if(this.playersGuess === this.winningNumber){
            return "You Win!";
        }
        else if(this.pastGuesses.includes(this.playersGuess)){
            return "You have already guessed that number.";
        }
        else{
            let diff = this.difference();
            this.pastGuesses.push(this.playersGuess);
            if(this.pastGuesses.length === 5){
                return "You Lose.";
            }
            else if(diff < 10){
                return "You\'re burning up!";
            }
            else if(diff >=10 && diff < 25){
                return "You\'re lukewarm.";
            }
            else if(diff >=25 && diff < 50){
                return "You\'re a bit chilly.";
            }
            return "You\'re ice cold!";
        }
    }
    provideHint(){
        let hintArr = [];
        hintArr.push(this.winningNumber);
        for(let i=0; i<2; i++){
            hintArr.push(generateWinningNumber());
        } 
        return shuffle(hintArr);
    }
}


// Returns an empty, new game instance
function newGame(){
    return new Game();
}

const pastGuessArray = document.getElementById('arr');
const hintButton = document.getElementById('Hint');
const resetButton  = document.getElementById('Reset');
const guessButton  = document.getElementById('Guess');
const message = document.getElementById('message');

function play(){
    let game = newGame();
    pastGuessArray.innerHTML = 'Take a guess!';
    message.innerHTML = null;
    console.log("Winning Game: ",game.winningNumber);
    console.log("Past Guesses: ", game.pastGuesses);
    guessButton.addEventListener('click', function(){
        const guess = document.querySelector('Input');
        game.playersGuessSubmission(Number(guess.value));
        console.log("Winning Game: ",game.winningNumber);
        console.log("Past Guesses: ", game.pastGuesses);
        pastGuessArray.innerHTML = game.pastGuesses.toString();
        message.innerHTML = game.checkGuess();
    })

    hintButton.addEventListener('click', function(){
        alert(game.provideHint());
        console.log("Winning Game: ",game.winningNumber);
        console.log("Past Guesses: ", game.pastGuesses);
    })

    resetButton.addEventListener('click', function(){
        console.log(game.pastGuesses);
        game = newGame();
        pastGuessArray.innerHTML = 'Take a guess!';
        message.innerHTML = null;

        console.log("Winning Game: ",game.winningNumber);
        console.log("Past Guesses: ", game.pastGuesses);
    })
}
play();
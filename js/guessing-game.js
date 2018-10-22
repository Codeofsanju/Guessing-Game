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
        if(num > 100 || num < 1 || typeof(num) !== 'number'){
            throw 'That is an invalid guess.';
        }
        this.playersGuess = num;
        return this.checkGuess(num);
    }
    checkGuess(){
        let ret = '';
        if(this.playersGuess === this.winningNumber){
            return  "You Win! Hit reset to play again.";
        }
        if(this.pastGuesses.includes(this.playersGuess)){
            ret =  "You have already guessed that number.";
        }
        else{
            let diff = this.difference();
            if(this.pastGuesses.length === 4){
                ret = "You Lose.";
            }
            else if(diff < 100){
                this.pastGuesses.push(this.playersGuess);

                ret = "You\'re ice cold!";
                if(diff < 50)ret = "You\'re a bit chilly.";
                if(diff < 25) ret =  "You\'re lukewarm.";
                if(diff < 10) ret =  "You\'re burning up!";
            }
        }
        return ret;
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
    const hint = game.provideHint();
    pastGuessArray.innerHTML = 'Take a guess!';
    message.innerHTML = null;
    
    guessButton.addEventListener('click', function(){        
        const guess = document.querySelector('Input');
        message.innerHTML = game.playersGuessSubmission(Number(guess.value));
        pastGuessArray.innerHTML = `Past Guesses: ${game.pastGuesses}`; 
    })

    hintButton.addEventListener('click', function(){
        let arr = hint.map(n => n.toString(2));
        message.innerHTML = `Binary Hint: ${arr} `;
        console.log(arr);
    })

    resetButton.addEventListener('click', function(){
        game = newGame();
        pastGuessArray.innerHTML = 'Take a guess!';
        message.innerHTML = null;
    })
}
play();
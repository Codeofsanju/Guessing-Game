/* 
Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".
In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.
*/
const generateWinningNumber = () =>{
    return Math.floor(Math.random() * (100 - 0) + 1);
}

const shuffle = (arr) =>{
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
        return this.playersGuess < this.winningNumber ? true:false;
    }
    playersGuessSubmission(num){
        if(num > 100 || num < 1 || typeof(num) !== 'number'){
            throw 'That is an invalid guess.';
        }
        this.playersGuess = num;
        return this.checkGuess();
    }
    checkGuess(){

    }
}

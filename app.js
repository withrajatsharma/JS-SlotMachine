// we have 3 lines (rows) and 3 columns on which we can bet on and it will only be a win if all 
// the three symobol of all 3 columns are same in a row and there will be a multiplier mechanism such 
// that if bet can be placed on line 1 , 1-2 and 1-2-3 (rows) there will be multiplier.

// run 'npm init' in terminal (must have node js installed) to include json file so that we can 
// import package of prompt-sync which will be used to take user input. => npm i prompt-sync


// ********** TASKS **********
// 1. deposit money
// 2. number of lines to bet on
// 3. bet amount
// 4. spin the slot
// 5. check for win
// 6. if win->give winnings
// 7. play again?


// require is a built in function of node to import from different files => here we are importing prompt-sync which we downloaded using node=> used for taking user input.
// ...(..)(); => to invoke a function immediately we put paranthesis right after declaration (IIFE)
const prompt = require("prompt-sync")();


// global variables....
const ROWS = 3;
const COLS = 3;

const SymbolsCount = {
    A : 2,  // basically most valuable.
    B : 4,
    C : 6,
    D : 8
}

const SymbolsValue = {
    A : 5,  // basically if all A's in a line it will return 5 times of bet.
    B : 4,
    C : 3,
    D : 2 
}


// funciton for taking deposit through user
const deposit = () => {
console.log(`\n`);

    // infinite loop until valid amount is input.
    while(true){
        // prompt is used like alert but a little bit different
        const deposit_X = prompt("Enter deposit amount: ");

        // prompt returns string so using parsefloat to convert string to floating point number eg. "11.23"=>11.23 and in case user put anything other than number parsefloat returns Nan.
        const depositAmount = parseFloat(deposit_X);

        // checking if user put a valid number or not => number should be greater than 0 and and not a Nan. and in case number is valid, returning the number and breaking the loop. 
        if(isNaN(depositAmount) || depositAmount <= 0){
            console.log(`**** invalid amount! try again ****\n`);
        }else {
            return depositAmount;
        }
    }

}


// taking no. of lines to bet on as input from user, same like deposit amount function.
const numberOfLinesToBetOn = () => {
    console.log(``);    // for empty line.

    while(true){
      
        const noOfLine_X = prompt("Enter number of lines to bet on (1-3): ");
        const noOfLines = parseFloat(noOfLine_X);

        if(isNaN(noOfLines) || noOfLines <= 0 || noOfLines >= 3){
            console.log(`**** invalid lines! try again ****\n`);
        }else {
            return noOfLines;
        }
    }

}


// taking amount of bet to place per line from user and here parameter is used to check if input bet is<= balance/noOfLines (bet will be multiplied by no of lines for multiplier effect), (initially balance is deposit amount).
const getBet = (balance) => {
    console.log(``);

    while(true){
      
        const bet_x = prompt("Enter the bet amount per line: ");
        const bet = parseFloat(bet_x);

        if(isNaN(bet) || bet > (balance / noOfLines) || bet <= 0){
            console.log(`**** invalid bet! try again ****\n`);
        }else {
            return bet;
        }
    }

}


const spin = () => {
    
}



let balance= deposit();
const noOfLines = numberOfLinesToBetOn();
const bet = getBet(balance);
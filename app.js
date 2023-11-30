// we have 3 lines (rows) and 3 columns on which we can bet on and it will only be a win if all the three symobol of all 3 columns are same in a row and 
// there will be a multiplier mechanism such that if bet can be placed on line 1 , 1-2 and 1-2-3 (rows) there will be multiplier.
// run 'npm init' in terminal (must have node js installed) to include json file so that we can import package of prompt-sync which will be used to take
// user input. => npm i prompt-sync


// ********** TASKS **********
// 1. deposit money
// 2. number of lines to bet on
// 3. bet amount
// 4. spin the slot
// 5. check for win
// 6. if win->give winnings
// 7. play again?


// "require"-> built in function of node to import from different files => here importing prompt-sync which we downloaded using node=> used for taking user input.
// ...(..)(); => to invoke a function immediately we put paranthesis right after declaration (IIFE).
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
        
        // prompt returns string so using parsefloat to convert string to floating point number eg. "11.23"=>11.23 and in case user put anything other than
        // number parsefloat returns Nan.
        const depositAmount = parseFloat(deposit_X);

        // checking if user put a valid number or not => number should be greater than 0 and not a Nan. and in case number is valid, returning the number
        // and breaking the loop. 
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

        if(isNaN(noOfLines) || noOfLines <= 0 || noOfLines > 3){
            console.log(`**** invalid lines! try again ****\n`);
        }else {
            return noOfLines;
        }
    }

}


// taking amount of bet to place per line from user and here parameter is used to check if input
// bet is<= balance/noOfLines (bet will be multiplied by no of lines for multiplier effect),
// (initially balance is deposit amount).
const getBet = (balance,noOfLines) => {
    console.log(``);

    while(true){
      
        const bet_x = prompt("Enter the amount to bet on per line: ");
        const bet = parseFloat(bet_x);

        if(isNaN(bet) || bet > (balance / noOfLines) || bet <= 0){
            console.log(`**** invalid bet! try again ****\n`);
        }else {
            return bet;
        }
    }

};


// function to randomly select symobls for wheel 
const spin = () => {
    const symobols = [];

// for of loop using to traverse through obj. symoblsCount and pushing that symobl
// count(A: 2 => pushing A two times.) times in symbols array.
    for(const [symobol, count] of Object.entries(SymbolsCount)){    
        for (let i = 0; i < count; i++) {     
            symobols.push(symobol);
                }
            }

//                                 //                       A
        const reels = [];          // -> [[A,A,A],[],[]] => A => inside arr represent columns or 
//                                 //          |            A       wheel of slot machine.
//                                             |
        for(let i = 0; i < COLS; i++){//       |
            reels.push([]);           //      <-    for 3 columns 3 nested arrays.

            // copying available symbols in reelSymbols through which we can randomly select a
            // symbol to add in wheel-1 and then remove it from available symbols. but it will 
            // make all symbols available again for next wheel i.e wheel-2 => also implies that
            // one wheel can have atmost 2 A's 4 B's and so on.
            const reelSymbols = [...symobols];
         
            for(let j = 0; j < ROWS; j++){
                // for selcting random symbol from array -> random function multiplied by arr
                // length so we get number to that index and putting it in floor method so that
                // we round it down to get value(0.9 => 0) 1 less than arr length.
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];

                // pushing that selected symbol in our first wheel and then removing that symbol
                // from array using splice(index, how many to delete from that index).
                 reels[i].push(selectedSymbol);
                 reelSymbols.splice(randomIndex,1);
            }
        }
        return reels;

};


//                                                                           [A B A]
//we get reels result in this format =>  [ [A B C] [B D C] [A D C] ]  ==>    [B D D]  => transposing matrix from columns to rows to check for win
//                                                                           [C C C]
const transpose = (reels) => {
        const rows = [];

        for(let i = 0; i < ROWS; i++){
            rows.push([]);
            for(let j = 0; j < COLS; j++){
                rows[i].push(reels[j][i]); //  [ [A B C] [B D C] [A D C] ]  ==> [ [A B A] [B D D] [C C C] ]
            }
        }
        return rows;
};


const printRows = (rows) => {
    console.log(`\n`);
    let count=1;
    for(const row of rows){
        
            let rowString = "row-"+count+" -->        ";  //empty string will use it to print
                                                          // row in format like => A | B | D
                count++;
            for(const[i,sym] of row.entries() ){
                rowString += sym;
                if (i != (row.length-1)) {  // we dont want to put pipe at end of the string
                        rowString += " | ";
                }
            }
            console.log(rowString);
    }
    console.log(`\n`);
}


const getWinnings = (rows, bet, lines) => {
            let winnings = 0;

            for(let row = 0; row < lines; row++){
                const symbols = rows[row];
                let allsame = true;

                for(const symbol of symbols){
                    if (symbol != symbols[0]) {
                        allsame = false;
                        break;
                    }
                }

                if(allsame){
                    winnings += bet * SymbolsValue[symbols[0]];
                }

            }
            return winnings;
}


const game = () => {
    let balance= deposit();

    while(true){
        console.log(`\nyou have balance of $${balance}`);
        const noOfLines = numberOfLinesToBetOn();
        const bet = getBet(balance,noOfLines);
        balance -= bet*noOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, noOfLines);
        balance += winnings;
        console.log(`You won, $${winnings.toString()}`);

        if(balance <= 0){
            console.log(`\nyou ran out of money!`);
            break;
        }

        const playagain = prompt("\nDo you want to play again (Y/N) ? : ");

            if (playagain == "n" || playagain == "N") {
                break;
            }
    }
};

game();

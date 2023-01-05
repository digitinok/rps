// variables to create the output on the HTML at the end
let container = document.getElementById('container'); 
let gameList = [];

const rpsChoice = ['r', 'p', 's'];
const rpsObject =  {'r': 'Rock',
                    'p': 'Paper',
                    's': 'Scissors'};
let exit = new Set(['e', 'x', 'q']); //exit characters

// initilize counters
let win = 0;
let loss = 0;
let tie = 0;

for (let loop=1; loop <= 10; loop++) {

    let player;
    let computer;
    let gameOver;

    do { // Lets Play
        player = prompt(`
            Let's Play Rock, Paper, Scissors!\n
            Game ${loop} out of 10!
            Please choose (R)ock, (P)aper or (S)cissors.
            --------------------------------------------
            E(x)it or (q)uite will finish the game.`);

        //Allows upper case text, trims of white spaces, looks only at the first character
        player = player.toLowerCase().trim()[0]; 
        
        // check for exit character
        gameOver = exit.has(player);

    } while (((player === 'undefined') || (rpsChoice.indexOf(player) === -1)) && !gameOver)

    // break the loop if an exit character is found
    if (gameOver) {break;}  
    
    // Random Computer choice 
    computer = Math.floor(Math.random() * rpsChoice.length);
    computer = rpsChoice[computer];

    let note = `You chose ${rpsObject[player]}, the computer chose ${rpsObject[computer]}.  `;
    if (player === computer) {
        tie++;
        note += `You tied!`;
    } else if ((player==='p' && computer==='r') 
            || (player==='s' && computer==='p') 
            || (player==='r' && computer==='s')){
        win++;
        note += `Congratulations, You Win!`;
    } else {
        loss++;
        note += `Sorry, the Computer wins!`;
    }

    console.log(note);
    //alert(note);

    // update the HTML - unfortunately, that only seem to happen after the scripts has finished
    gameList[loop-1] = document.createElement('p');
    gameList[loop-1].innerHTML = loop + ":\t" + note;
    container.appendChild(gameList[loop-1]);
}

// Determine the overall winner
let note = `
    You have ${win} win(s), 
    the computer has ${loss} win(s) 
    and you have ${tie} tie(s). 
    -------------------------------
    `;
if (win === loss) {
    note += `Overall you tied!`;
}
if (win > loss) {
    note += `Congratulations, You WIN!`
} else {
    note += `Sorry, the computer wins!`
}

console.log(note);
//alert(note);

    // update the HTML with the final result
    let a = document.createElement('pre');
    a.innerHTML = note;
    a.style.fontSize = "x-large";
    container.appendChild(a);


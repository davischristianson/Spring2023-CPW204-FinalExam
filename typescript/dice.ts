function generateRandomValue(minValue:number, maxValue:number):number{
    var random:number = 0;
    
    //TODO: use random to generate a number between min and max
    random = Math.floor(Math.random() * maxValue) + minValue;

    return random;
}

function changePlayers():void{
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if(currentPlayerName == player1Name) {
        currentPlayerName = player2Name;
    }
    else if(currentPlayerName == player2Name) {
        currentPlayerName = player1Name;
    }
    else {
        currentPlayerName = player1Name;
    }

    document.getElementById("current").innerText = currentPlayerName;
}

window.onload = function(){
    let newGameBtn = <HTMLInputElement>document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    document.getElementById("roll").onclick = rollDie;

    document.getElementById("hold").onclick = holdDie;
}

function pigDiceChampion() {
    // Player names
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;
    // Player scores
    let player1Score = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let player2Score = parseInt((<HTMLInputElement>document.getElementById("score2")).value);

    // div to put new elements in
    let winnerDiv = document.getElementById("champion");
    let championHeading = document.createElement("h2");
    championHeading.id = "champ";
    championHeading.className = "currChampion";

    if(player1Score > player2Score) {
        championHeading.innerText = `${player1Name} has won! Their score was ${player1Score}.` +
                                ` Press new game to play another or continue to play forever!`;
    }
    else if(player2Score > player1Score) {
        championHeading.innerText = `${player2Name} has won! Their score was ${player2Score}.` +
                                ` Press new game to play another or continue to play forever!`;
    }
    winnerDiv.appendChild(championHeading);

    document.getElementById("champion").style.visibility = "visible";
}

function createNewGame(){
    document.getElementById("champion").style.visibility = "hidden";

    //set player 1 and player 2 scores to 0
    let score1 = <HTMLInputElement>document.getElementById("score1");
    score1.value = "0";
    let score2 = <HTMLInputElement>document.getElementById("score2");
    score2.value = "0";

    //verify each player has a name
    //if both players don't have a name display error
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    let canStartGame:boolean = true;

    if(player1Name.trim() == "") {
        document.getElementById("name1Error").style.visibility = "visible";
        canStartGame = false;
    }
    if(player2Name.trim() == "") {
        document.getElementById("name2Error").style.visibility = "visible";
        canStartGame = false;
    }

    // To see if the user has entered one or both names in the player name textbox.
    // If they have, hide error message
    if(player1Name.trim() != "") {
        document.getElementById("name1Error").style.visibility = "hidden";
    }
    if(player2Name.trim() != "") {
        document.getElementById("name2Error").style.visibility = "hidden";
    }

    // If true, start the game
    if(canStartGame) {
        document.getElementById("turn").classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}

function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    let dieRoll:number = 0;

    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    dieRoll = generateRandomValue(1, 6);
    let dieValue = <HTMLInputElement>document.getElementById("die");
    dieValue.value = dieRoll.toString();
    
    //if the roll is 1
    //  change players
    //  set current total to 0
    if(dieRoll == 1) {
        currTotal = 0;
        changePlayers();
    }
    
    //if the roll is greater than 1
    //  add roll value to current total
    if(dieRoll > 1) {
        currTotal += dieRoll;
    }

    //set the die roll to value player rolled
    //display current total on form
    let total = <HTMLInputElement>document.getElementById("total");
    total.value = currTotal.toString();
}

function holdDie():void{
    //get the current turn total
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    let player1Score = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let player2Score = parseInt((<HTMLInputElement>document.getElementById("score2")).value);

    let addScore = currTotal;


    //determine who the current player is
    //add the current turn total to the player's total score
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    if(currentPlayerName == player1Name) {
        player1Score += addScore;
        (<HTMLInputElement>document.getElementById("score1")).value = player1Score.toString();
        if(player1Score >= 100) {
            pigDiceChampion();
        }
    }
    else if(currentPlayerName == player2Name) {
        player2Score += addScore;
        (<HTMLInputElement>document.getElementById("score2")).value = player2Score.toString();
        if(player1Score >= 100) {
            pigDiceChampion();
        }
    }

    //reset the turn total to 0
    let total = <HTMLInputElement>document.getElementById("total");
    currTotal = 0;
    total.value = currTotal.toString();

    let dieRoll = <HTMLInputElement>document.getElementById("die");
    dieRoll.value = "";

    //change players
    changePlayers();
}
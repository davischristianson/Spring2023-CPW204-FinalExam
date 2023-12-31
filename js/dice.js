function generateRandomValue(minValue, maxValue) {
    var random = 0;
    random = Math.floor(Math.random() * maxValue) + minValue;
    return random;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (currentPlayerName == player1Name) {
        currentPlayerName = player2Name;
    }
    else if (currentPlayerName == player2Name) {
        currentPlayerName = player1Name;
    }
    else {
        currentPlayerName = player1Name;
    }
    document.getElementById("current").innerText = currentPlayerName;
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function pigDiceChampion() {
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    var player1Score = parseInt(document.getElementById("score1").value);
    var player2Score = parseInt(document.getElementById("score2").value);
    var winnerDiv = document.getElementById("champion");
    var championHeading = document.createElement("h2");
    championHeading.id = "champ";
    championHeading.className = "currChampion";
    if (player1Score > player2Score) {
        championHeading.innerText = "".concat(player1Name, " has won! Their score was ").concat(player1Score, ".") +
            " Press new game to play another or continue to play forever!";
    }
    else if (player2Score > player1Score) {
        championHeading.innerText = "".concat(player2Name, " has won! Their score was ").concat(player2Score, ".") +
            " Press new game to play another or continue to play forever!";
    }
    winnerDiv.appendChild(championHeading);
    document.getElementById("champion").style.visibility = "visible";
}
function createNewGame() {
    document.getElementById("champion").style.visibility = "hidden";
    var score1 = document.getElementById("score1");
    score1.value = "0";
    var score2 = document.getElementById("score2");
    score2.value = "0";
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    var canStartGame = true;
    if (player1Name.trim() == "") {
        document.getElementById("name1Error").style.visibility = "visible";
        canStartGame = false;
    }
    if (player2Name.trim() == "") {
        document.getElementById("name2Error").style.visibility = "visible";
        canStartGame = false;
    }
    if (player1Name.trim() != "") {
        document.getElementById("name1Error").style.visibility = "hidden";
    }
    if (player2Name.trim() != "") {
        document.getElementById("name2Error").style.visibility = "hidden";
    }
    if (canStartGame) {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
    var dieRoll = 0;
    dieRoll = generateRandomValue(1, 6);
    var dieValue = document.getElementById("die");
    dieValue.value = dieRoll.toString();
    if (dieRoll == 1) {
        currTotal = 0;
        changePlayers();
    }
    if (dieRoll > 1) {
        currTotal += dieRoll;
    }
    var total = document.getElementById("total");
    total.value = currTotal.toString();
}
function holdDie() {
    var currTotal = parseInt(document.getElementById("total").value);
    var player1Score = parseInt(document.getElementById("score1").value);
    var player2Score = parseInt(document.getElementById("score2").value);
    var addScore = currTotal;
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (currentPlayerName == player1Name) {
        player1Score += addScore;
        document.getElementById("score1").value = player1Score.toString();
        if (player1Score >= 100) {
            pigDiceChampion();
        }
    }
    else if (currentPlayerName == player2Name) {
        player2Score += addScore;
        document.getElementById("score2").value = player2Score.toString();
        if (player1Score >= 100) {
            pigDiceChampion();
        }
    }
    var total = document.getElementById("total");
    currTotal = 0;
    total.value = currTotal.toString();
    var dieRoll = document.getElementById("die");
    dieRoll.value = "";
    changePlayers();
}

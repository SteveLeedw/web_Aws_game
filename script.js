var casinoCraps = (function () {

    var die1 = 0;
    var die2 = 0;
    var total = 0;
    var points = 0;
    var winNumber = 0;
    var loseNumber = 0;
    var firstTurn = true;
    var gameOver = false;

    var results = {
        win: "You win!",
        lose: "You lose!",
        continue: "Roll again!"
    }

    var die1Output = document.getElementById("die1");
    var die2Output = document.getElementById("die2");
    var totalOutput = document.getElementById("total");
    var pointsOutput = document.getElementById("points");
    var instructions = document.getElementById("instructions");
    var statistics = document.getElementById("statistics");

    var rollButton = document.getElementsByTagName("button")[0];
    var resetButton = document.getElementsByTagName("button")[1];

    function init() {
        rollButton.addEventListener("click", rollDice);
        resetButton.addEventListener("click", resetStats);
    }

    function rollDice() {
        die1 = random(1, 6);
        die2 = random(1, 6);
        total = die1 + die2;
        if (firstTurn) {
            points = total;
        }
        display();

    }
    function display() {
        if (firstTurn) {
            pointsOutput.textContent = "";
        }
        die1Output.textContent = die1;
        die2Output.textContent = die2;
        totalOutput.textContent = total;
        instructions.textContent = checkGameOver();
        if (gameOver) {
            displayGameOver();
        }
    }
    function displayGameOver() {
        var gameResult = checkGameOver();
        if (gameResult === "You win!") {
            winNumber++;
        } else {
            loseNumber++;
        }
        statistics.innerHTML = "Wins: " + winNumber
            + "<br>Losses: " + loseNumber;
        instructions.innerText += "\n\nRoll the dice to play again!";
        displayPopUp(gameResult);
        firstTurn = true;
        gameOver = false;
    }
    function checkGameOver() {
        if (firstTurn) {
            if (total === 7 || total === 11) {
                gameOver = true;
                return results["win"];
            } else if (total === 2 || total === 3 || total === 12) {
                gameOver = true;
                return results["lose"];
            } else {
                firstTurn = false;
                pointsOutput.textContent = "Points: " + points;
                return results["continue"];
            }
        } else {
            if (total === points) {
                gameOver = true;
                return results["win"];
            } else if (total === 7) {
                gameOver = true;
                return results["lose"];
            } else {
                return results["continue"];
            }
        }
    }
    function resetStats() {
        die1 = 0;
        die2 = 0;
        total = 0;
        points = 0;
        winNumber = 0;
        loseNumber = 0;
        firstTurn = true;
        gameOver = false;
        die1Output.textContent = die1;
        die2Output.textContent = die2;
        totalOutput.textContent = "00";
        pointsOutput.textContent = "";
        statistics.innerHTML = "Wins: " + winNumber
            + "<br>Losses: " + loseNumber;
        instructions.textContent = "Roll the dice to start the game!";
    }

    return {
        init: init,
    };
})();

var ticTacToe = (function () {
    var turn = 0;
    var empty = 9;
    var winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [6, 4, 2]
    ];

    var startButton = document.getElementsByTagName("button")[0];
    var board = document.getElementsByTagName("td");
    var instructions = document.getElementsByTagName("p")[0];

    function init() {
        startButton.addEventListener("click", startGame);
    }

    function startGame() {
        clearBoard();
        startButton.textContent = "Restart Game";
        instructions.textContent = "Player X's turn";
        for (var i = 0; i < board.length; i++) {
            board[i].addEventListener("click", makeMove);
        }
    }

    function makeMove() {
        if (turn % 2 === 0) {
            this.textContent = "X";
            this.setAttribute("class", "playerX");
            this.removeEventListener("click", makeMove);
            instructions.textContent = "Player O's turn";
        } else {
            this.textContent = "O";
            this.setAttribute("class", "playerO");
            this.removeEventListener("click", makeMove);
            instructions.textContent = "Player X's turn";
        }
        turn++;
        empty--;
        checkWin();
    }
    function checkWin() {
        for (var i = 0; i < winCombos.length; i++) {
            if (board[winCombos[i][0]].textContent === "X"
                && board[winCombos[i][1]].textContent === "X"
                && board[winCombos[i][2]].textContent === "X") {
                for (var j = 0; j < winCombos[i].length; j++) {
                    board[winCombos[i][j]].setAttribute("class", "ticTacToeWin");
                }
                displayGameOver("Player X Wins!");
                return;
            } else if (board[winCombos[i][0]].textContent === "O"
                && board[winCombos[i][1]].textContent === "O"
                && board[winCombos[i][2]].textContent === "O") {
                for (var j = 0; j < winCombos[i].length; j++) {
                    board[winCombos[i][j]].setAttribute("class", "ticTacToeWin");
                }
                displayGameOver("Player O Wins!");
                return;
            }
        }
        if (empty === 0) {
            displayGameOver("It's a Tie!");
        }
    }
    function displayGameOver(message) {
        for (var i = 0; i < board.length; i++) {
            board[i].removeEventListener("click", makeMove);
        }

        displayPopUp(message);
    }
    function clearBoard() {
        for (var i = 0; i < board.length; i++) {
            board[i].textContent = "";
            board[i].removeAttribute("class");
        }
        turn = 0;
        empty = 9;
    }

    return {
        init: init
    };
})();

var bingo = (function () {
    var bingoValues = [
        buildArray(1, 15),  
        buildArray(16, 30), 
        buildArray(31, 45), 
        buildArray(46, 60), 
        buildArray(61, 75)  
    ];
    var callingNumbers = shuffle1DArray(buildArray(1, 75));
    var callingIndex = 0;
    var winCombos = [
      
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24]
    ];
    var card = document.getElementsByTagName("td");
    var generateButton = document.getElementsByTagName("button")[0];
    var callButton = document.getElementsByTagName("button")[1];
    var numbersHeading = document.createElement("h3");
    var currentNumOutput = document.createElement("p");
    var previousNumOutput = document.createElement("p");

    function init() {
        generateButton.addEventListener("click", generateCard);
        var container = document.createElement("div");
        container.setAttribute("class", "container");
        var main = document.getElementsByTagName("main")[0];
        main.appendChild(container);
        numbersHeading.textContent = "BINGO Numbers";
        currentNumOutput.innerHTML = "Current number: <br>";
        previousNumOutput.innerHTML = "Previous numbers: <br>";
        container.appendChild(numbersHeading);
        container.appendChild(currentNumOutput);
        container.appendChild(previousNumOutput);
    }
    function generateCard() {
        var randomBingoNumbers = shuffle2DArray(bingoValues);
        var rowNumber = 0;
        for (var i = 0; i < card.length; i++) {
            if (i % 5 === 4) {
                rowNumber++;
            }
            if (i % 5 === 0) {
                card[i].textContent = randomBingoNumbers[0][rowNumber];
            } else if (i % 5 === 1) {
                card[i].textContent = randomBingoNumbers[1][rowNumber];
            } else if (i % 5 === 2) {
                if (i !== 12) {
                    card[i].textContent = randomBingoNumbers[2][rowNumber];
                } else {
                    card[i].textContent = "FREE";
                }
            } else if (i % 5 === 3) {
                card[i].textContent = randomBingoNumbers[3][rowNumber];
            } else {
                card[i].textContent = randomBingoNumbers[4][rowNumber];
            }
        }

        startGame();
    }

    function startGame() {
        generateButton.removeEventListener("click", generateCard);
        generateButton.textContent = "Start New Game";
        generateButton.addEventListener("click", resetGame);
        callButton.addEventListener("click", callNumber);
    }
    function callNumber() {
        if (callingIndex > callingNumbers.length) {
            callButton.removeEventListener("click", callNumber);
        }
        var currentNumber = callingNumbers[callingIndex];
        callingIndex++;
        var bingoNumber = addBingoLetter(currentNumber);
        currentNumOutput.innerHTML = "Current number: <br>" + bingoNumber;
        ;
        if (stampCard(currentNumber)) {
            previousNumOutput.innerHTML += "<strong>"
                + bingoNumber + "<strong>, ";
        } else {
            previousNumOutput.innerHTML += bingoNumber + ", "
        }
        if (checkCard()) {
            displayGameOver();
        }
    }
    function addBingoLetter(number) {
        if (number < 1 && number > 75) {
            return number;
        } else if (number >= 1 && number <= 15) {
            return ("B" + number);
        } else if (number >= 16 && number <= 30) {
            return ("I" + number);
        } else if (number >= 31 && number <= 45) {
            return ("N" + number);
        } else if (number >= 46 && number <= 60) {
            return ("G" + number);
        } else if (number >= 61 && number <= 75) {
            return ("O" + number);
        }
    }
    function stampCard(number) {
        for (var i = 0; i < card.length; i++) {
            if (card[i].textContent == number) {
                card[i].setAttribute("class", "filled");
                return true;
            }
        }
        return false;
    }
    function checkCard() {
        var isWinner = false;
        for (var i = 0; i < winCombos.length; i++) {
            for (var j = 0; j < winCombos[i].length; j++) {
                var currentCell = card[winCombos[i][j]];
                if (currentCell.getAttribute("class") === "filled"
                    || currentCell.getAttribute("id") === "free") {
                    isWinner = true;
                } else {
                    isWinner = false;
                    break;
                }
            }
            if (isWinner) {
                return isWinner; 
            }
        }
        return isWinner; 
    }

    function displayGameOver() {
        callButton.removeEventListener("click", callNumber);
        displayPopUp("You win!");
    }
    function resetGame() {
        callingNumbers = shuffle1DArray(buildArray(1, 75));
        callingIndex = 0;
        numbersHeading.innerHTML = "<br>";
        currentNumOutput.innerHTML = "<br>";
        previousNumOutput.innerHTML = "<br>";
        for (var i = 0; i < card.length; i++) {
            card[i].textContent = "";
            if (i !== 12) {
                card[i].removeAttribute("class");
            }
        }
        card[12].textContent = "FREE";
        previousNumbers = [];

        generateButton.removeEventListener("click", callNumber);

        generateButton.textContent = "Generate New Card";
        generateButton.addEventListener("click", resetGame);
        generateButton.addEventListener("click", generateCard);
    }
    function buildArray(num1, num2) {
        var array = [];
        for (var i = num1; i <= num2; i++) {
            array.push(i);
        }
        return array;
    }

    return {
        init: init
    };

})();

var concentration = (function () {
    var pairs = [
        "\u2660", "\u2665", "\u2666", "\u2663",
        "\u2654", "\u2655", "\u2656", "\u2657",
        "\u2658", "\u2659", "\u2601", "\u2600",
        "\u2602", "\u2603", "\u2606", "\u260A",
        "\u260F", "\u261A"
    ];

    var pairs = [
        "https://img.icons8.com/color/48/000000/pokemon.png",
        "https://img.icons8.com/color/48/000000/snorlax.png",
        "https://img.icons8.com/color/48/000000/psyduck.png",
        "https://img.icons8.com/color/48/000000/dratini.png",
        "https://img.icons8.com/color/48/000000/meowth.png",
        "https://img.icons8.com/color/48/000000/jigglypuff.png",
        "https://img.icons8.com/color/48/000000/squirtle.png",
        "https://img.icons8.com/color/48/000000/caterpie.png",
        "https://img.icons8.com/color/48/000000/charmander.png",
        "https://img.icons8.com/color/48/000000/bellsprout.png",
        "https://img.icons8.com/color/48/000000/zubat.png",
        "https://img.icons8.com/color/48/000000/weedle.png",
        "https://img.icons8.com/color/48/000000/eevee.png",
        "https://img.icons8.com/color/48/000000/abra.png",
        "https://img.icons8.com/color/48/000000/mew.png",
        "https://img.icons8.com/color/48/000000/pidgey.png",
        "https://img.icons8.com/color/48/000000/bullbasaur.png",
        "https://img.icons8.com/color/48/000000/pokeball-2.png"
    ];
    var clicks = 0;
    var lastClicked = [];
    var gameOver = false;
    var id;
    var ticker = 0;
    var min = 0;
    var sec = 0;
    var grid = document.getElementsByTagName("td");
    var timer = document.getElementsByTagName("button")[0];
    var newGameButton = document.getElementsByTagName("button")[1];

    function init() {
        newGameButton.addEventListener("click", resetGame);
    }
    function fillGrid() {
        var shuffledPairs = [];
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < pairs.length; j++) {
                shuffledPairs.push(pairs[j]);
            }
        }
        shuffledPairs = shuffle1DArray(shuffledPairs);
        for (var i = 0; i < grid.length; i++) {
            var image = document.createElement("img");
            image.setAttribute("src", shuffledPairs[i]);
            grid[i].appendChild(image);
            grid[i].setAttribute("class", "hidden");
            grid[i].addEventListener("click", checkMatch);
        }
    }
    function checkMatch() {
        if ((this.getAttribute("class") !== "found") && (clicks < 2)) {
            this.setAttribute("class", "visible");
            clicks++;
            lastClicked.push(this);
            if (lastClicked.length > 2) {
                lastClicked.shift();
            }
        } else {
            return;
        }
        if (clicks === 2) {
            var imgTag1 = lastClicked[0].childNodes[0];
            var img1 = imgTag1.getAttribute("src");
            var imgTag2 = lastClicked[1].childNodes[0];
            var img2 = imgTag2.getAttribute("src");
            if (img1 === img2 && lastClicked[0] != lastClicked[1]) {

                console.log("match made");
                console.log(img1);
                console.log(img2);
                lastClicked[0].setAttribute("class", "found");
                lastClicked[1].setAttribute("class", "found");
                clicks = 0;
                checkWin();
            } else {
                setTimeout(hideLastTwo, 1000);
            }
        }
    }
    function hideLastTwo() {
        if (lastClicked[0].getAttribute("class") !== "found") {
            lastClicked[0].setAttribute("class", "hidden");
            lastClicked[1].setAttribute("class", "hidden");
        }
        clicks = 0;
    }
    function checkWin() {
        for (var i = 0; i < grid.length; i++) {
            if (grid[i].getAttribute("class") !== "found") {
                return;
            }
        }
        displayGameOver("You Win!");
    }
    function displayGameOver(message) {
        displayPopUp(message);
        gameOver = true;
        for (var i = 0; i < grid.length; i++) {
            grid[i].removeEventListener("click", checkMatch);
        }
    }
    function runClock() {
        min = Math.floor(ticker / 60);
        sec = (ticker - (min * 60)) + "";
        if (sec.length == 1) {
            sec = "0" + sec;
        }
        ticker--;
        timer.textContent = min + ":" + sec;
        if (min <= 0 && sec == 0) {
            console.log("Over time");
            displayGameOver("Time ran out! You lose!");
            return;
        }
        if (min == 0 && sec == 20) {
            timer.setAttribute("id", "orangeTimer");
        }

        if (min == 0 && sec == 10) {
            timer.setAttribute("id", "redTimer");
        }

        if (!gameOver) {
            id = setTimeout("concentration.runClock()", 1000);
        }
    }
    function resetGame() {
        ticker = 120;
        min = 2;
        sec = 0;
        clearTimeout(id);
        timer.removeAttribute("id");
        for (var i = 0; i < grid.length; i++) {
            grid[i].innerHTML = "";
        }
        gameOver = false;
        fillGrid();
        runClock();
    }

    return {
        init: init,
        runClock: runClock
    };

})();
function random(min, max) {
    return Math.floor((Math.random() * ((max + 1) - min)) + min);
}

function shuffle1DArray(array) {
    var shuffledArray = array.slice();
    for (var i = 0; i < shuffledArray.length; i++) {
        var randomIndex = random(0, (shuffledArray.length - 1));
        var temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = temp;
    }
    return shuffledArray;
}
function shuffle2DArray(array2D) {
    var shuffledArray = array2D.slice();
    for (var i = 0; i < shuffledArray.length; i++) {
        for (var j = 0; j < shuffledArray[i].length; j++) {
            var randomIndex = random(0, (shuffledArray[i].length - 1));
            var temp = shuffledArray[i][j];
            shuffledArray[i][j] = shuffledArray[i][randomIndex];
            shuffledArray[i][randomIndex] = temp;
        }
    }
    return shuffledArray;
}
function displayPopUp(gameOverMessage) {
    console.log("Adding panel");
    var main = document.getElementsByTagName("main")[0];
    var body = document.getElementsByTagName("body")[0];
    var winPanel = document.createElement("div");
    winPanel.setAttribute("class", "gameOverBox");
    main.appendChild(winPanel);
    var title = document.createElement("h4");
    title.textContent = "Game Over!";
    winPanel.appendChild(title);
    var message = document.createElement("h2");
    message.textContent = gameOverMessage;
    winPanel.appendChild(message);
    var closeButton = document.createElement("p");
    closeButton.textContent = "- click anywhere to dismiss this message -";
    winPanel.appendChild(closeButton);
    body.addEventListener("click", removeWinPanel, true);

}

function removeWinPanel() {
    var winPanel = document.getElementsByClassName("gameOverBox")[0];
    var body = document.getElementsByTagName("body")[0];
    winPanel.parentNode.removeChild(winPanel);
    body.removeEventListener("click", removeWinPanel, true);
}



















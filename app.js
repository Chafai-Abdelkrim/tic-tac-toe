//The module that taks care of the board functionality
const Board = (() => {
    //varable declerations
    let turn = "X";
    let boardArray = Array(9).fill(null);
    let gameOver = false;
    let round = 0;
    //function to access turn variable 
    const getTurn = () => {return turn};
    //function to access game board array
    const getBoardArray = () => {return boardArray};
    //function to access gameover aviable
    const getGameOver = () => {return gameOver};
    //function to access round variable
    const getRound = () => {return round};
    //next turn function
    const nextTurn = () => {
        turn = turn === "X" ? "O" : "X";
        round++;
    };
    //function that checks if it's possible to play a round and play a round when it's possible
    const playRound = (i) => {
        //checking if it's possible to play a round
        if (boardArray[i] !== null) {return;}
        if (round >= 9){return;}
        if (gameOver) {return;}
        //playing a round
        boardArray[i] = turn;
        nextTurn();
        gameWinner();
    };
    //The module that checks game winner
    const gameWinner = () => {

        let winnersCombination = [];

        const winningCombination = [
            [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
        ];
        //loop to check the winner combination
        for (let i = 0; i < winningCombination.length; i++) {
            if (boardArray[winningCombination[i][0]] !== null
                &&boardArray[winningCombination[i][0]] === boardArray[winningCombination[i][1]]
                && boardArray[winningCombination[i][1]] === boardArray[winningCombination[i][2]]){
                    gameOver = true;
                    winnersCombination = winningCombination[i];
            }
        };
        return winnersCombination;
    };
    //function to reset board
    const resetBoard = () => {
        for (let i = 0; i < boardArray.length; i++) {
            boardArray[i] = null;
        };
        round = 0;
        turn = "X";
        gameOver = false;
        displayBoard.displayReset();
    };

    return {getTurn, getBoardArray, getGameOver, getRound, playRound, gameWinner, resetBoard};
})();

//display the board in browser
const displayBoard = (() => {
    //create infoText, xoText and button with DOM
    const createElements = function() {
        const infoText = document.createElement("p");
        infoText.classList.add("infoText");
        infoText.textContent = "Press on a box to start a game";
        
        const cell = document.querySelectorAll(".board-cell");
        for (let i = 0; i < 9; i++) {
            
            const xoText = document.createElement("p");
            xoText.classList.add("xoText");
            cell[i].appendChild(xoText);
        }

        const button = document.createElement("button");
        button.classList.add("resetBtn");
        button.textContent = "Restart";
        button.addEventListener("click", () => {
            Board.resetBoard();
        });
    
        document.querySelector('.board').insertAdjacentElement("beforebegin", infoText);
        document.querySelector('.board').insertAdjacentElement("afterend", button);
    }();
    //declaring needed variables.
    const boardArray = Board.getBoardArray();
    const infoText = document.querySelector('.infoText');
    const xoText = document.querySelectorAll('.xoText');

    //Function  to update the game board.
    const updateBoard = () => {
        for (let i = 0; i < boardArray.length; i++) {
            xoText[i].textContent = boardArray[i];
        }

        infoText.textContent = `It's ${Board.getTurn()}'s turn`;

        if (Board.getGameOver() == false && Board.getRound() == 9){
            Draw();
        }

        if (Board.getGameOver() === true){
            const winnersCombination = Board.gameWinner();
            Winner(winnersCombination);
        }
    };
    //function to start the game by clicking for the first time
    const startGame = (() => {
        const clickCells = document.querySelectorAll('.board-cell');
        clickCells.forEach((cell, i) => {
            cell.addEventListener('click', () => {
                Board.playRound(i);
                updateBoard();
            });
        });
    })();
    //function to update the game winner and the adds a class for styling purposes.
    const Winner = (winningCombination) => {
        let winner = boardArray[winningCombination[0]]; //checks if the winner is an "X" or "O"
        infoText.textContent = `${winner} won this one 😉`;
        infoText.classList.add("winner");
        for (let i = 0; i < winningCombination.length; i++){
            xoText[winningCombination[i]].classList.add("winner");
        }
    };
    //function to handle a draw
    const Draw = () => {
        infoText.classList.remove("winner");
        infoText.classList.add("draw");
        infoText.textContent = "No winner this time 🙁. TRY AGAIN!!!";
    };
    //function to visualy reset the board on the browser
    const displayReset = () => {
        infoText.textContent = "Press on a box to start a game";
        infoText.classList.remove("winner", "draw");
        xoText.forEach(item => {
            item.classList.remove("winner");
        });
        updateBoard();
    };

    return {createElements, updateBoard, Winner, Draw, displayReset};

})();

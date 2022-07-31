//The module that taks care of the board functionality
const Board = (() => {
    //varable declerations
    let turn = "X";
    let boardArrey = Array(9).fill(null);
    let gameOver = false;
    let round = 0;
    //function to access turn variable 
    const getTurn = () => {return turn};
    //function to access game board array
    const getBoardArray = () => {return boardArrey};
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
        if (boardArrey[i] !== null) {return;}
        if (round >= 9){return;}
        if (gameOver) {return;}
        //playing a round
        boardArrey[i] = turn;
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
                &&boardArrey[winningCombination[i][0]] === boardArrey[winningCombination[i][1]]
                && boardArrey[winningCombination[i][1]] === boardArrey[winningCombination[i][2]]){
                    gameOver = true;
                    winnersCombination = winnersCombination[i];
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
    //create infoText and button with DOM
    const createElements = function() {
        const infoText = document.createElement("p");
        infoText.classList.add("infoText");
        infoText.textContent = "Press on a box to start a game";
    
        const button = document.createElement("button");
        button.classList.add("resetBtn");
        button.textContent = "Restart";
        button.addEventListener("click", () => {
            Board.resetBoard();
        });
    
        document.querySelector('.board').insertAdjacentElement("beforebegin", infoText);
        document.querySelector('.board').insertAdjacentElement("afterend", button);
    }();

    const boardArrey = Board.getBoardArray();
    const infoText = document.querySelector('.infoText');
    
})();

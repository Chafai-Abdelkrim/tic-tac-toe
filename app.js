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
        //checking possibility of playing a round
        if (boardArrey[i] !== null) {return;}
        if (round >= 9){return;}
        if (gameOver) {return;}
        //playing a round
        boardArrey[i] = turn;
    };
})();
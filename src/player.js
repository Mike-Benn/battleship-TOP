import { GameBoard } from "./gameboard";
export { Player };

function Player(playerName , type) {
    
    let name = playerName;
    let gameboard = null;
    let playerType = type;

    const getName = () => name;

    const getGameBoard = () => gameboard;

    const getPlayerType = () => playerType;

    const setGameBoard = (board) => gameboard = board;

    const createGameBoard = () => {
        let freshGameBoard = GameBoard();
        if (type === "Computer") {
            freshGameBoard.generateRandomBoard();
            gameboard = freshGameBoard;
        } else {
            freshGameBoard.generateBoard();
            gameboard = freshGameBoard;
        }
        
    }

    const resetGameBoard = () => {
        gameboard = null;
    }

    return {
        getName,
        getGameBoard,
        getPlayerType,
        setGameBoard,
        createGameBoard,
        resetGameBoard
    }
}
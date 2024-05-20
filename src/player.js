import { GameBoard } from "./gameboard";
export { Player };

function Player(playerName , type) {
    
    let name = playerName;
    let gameboard = null;
    let playerType = type;

    const getName = () => name;

    const getGameBoard = () => gameboard;

    const getPlayerType = () => playerType;

    const createBoard = () => {
        let freshGameBoard = GameBoard();
        freshGameBoard.generateBoard();
        gameboard = freshGameBoard;
    }

    const resetBoard = () => {
        gameboard = null;
    }

    return {
        getName,
        getGameBoard,
        getPlayerType,
        createBoard,
        resetBoard
    }
}
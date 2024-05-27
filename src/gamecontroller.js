import { Player } from "./player";
import { GameBoard } from "./gameboard";
export { GameController };



function GameController() {
    let playerOne = Player("Player" , "Human");
    let playerTwo = Player("CPU" , "Computer");
    let pregameBoard = GameBoard();
    let currentTurn = 0;
    let phase = "pregame";


    const getPlayerOne = () => playerOne;

    const getPlayerTwo = () => playerTwo;
    
    const getPregameBoard = () => pregameBoard;

    const getTurn = () => currentTurn;

    const getPhase = () => phase;

    const switchTurn = () => {
        if (currentTurn === 0) {
            currentTurn = 1;
        } else {
            currentTurn = 0;
        }
    }

    const startGame = () => {
        phase = "live";
    }

    return {
        getPlayerOne,
        getPlayerTwo,
        getPregameBoard,
        getTurn,
        getPhase,
        switchTurn,
        startGame
    }


}
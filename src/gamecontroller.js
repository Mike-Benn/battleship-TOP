import { Player } from "./player";
import { GameBoard } from "./gameboard";
export { GameController };



function GameController() {
    let playerOne = Player("Player" , "Human");
    let playerTwo = Player("CPU" , "Computer");
    let currentTurn = 0;
    let phase = "pregame";


    const getPlayerOne = () => playerOne;

    const getPlayerTwo = () => playerTwo;

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
        getTurn,
        getPhase,
        switchTurn,
        startGame
    }


}
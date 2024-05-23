import { Player } from "./player";
export { GameController };



function GameController() {
    let player1 = Player("Player" , "Human");
    let player2 = Player("Computer" , "Computer");
    let currentTurn = 0;
    let phase = "pregame";


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
        getTurn,
        getPhase,
        switchTurn,
        startGame
    }


}
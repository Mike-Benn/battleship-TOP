import { GameController } from "./gamecontroller";
import { Ship } from "./ship";
export { ScreenController };

function ScreenController() {
    let game = null;
    let button = document.querySelector('.top-left');
    // GAME LISTENERS

    function squareClickedListener(e) {
        const location = e.target.dataset.value;
        const row = location.charAt(0);
        const col = location.charAt(1);

        if (game.getTurn() === 0) {
            let board = game.getPlayerOne().getGameBoard();
            board.receiveAttack(row , col);
            game.switchTurn();
            updateTurnDisplay();
            updateMainScreen();
        } else {
            let board = game.getPlayerTwo().getGameBoard();
            board.receiveAttack(row , col);
            game.switchTurn();
            updateTurnDisplay();
            updateMainScreen();

        }
        
    }
    
    

    const loadGame = () => {
        game = GameController();
        game.getPlayerOne().createGameBoard();
        game.getPlayerTwo().createGameBoard();

        let playerOneBoard = game.getPlayerOne().getGameBoard();
        let playerTwoBoard = game.getPlayerTwo().getGameBoard();

        let playerOneCarrier = Ship(5 , "carrier");
        let playerOneBattleShip = Ship(4 , "battleship");
        let playerOneSubmarine = Ship(3 , "submarine");
        let playerOnePatrol = Ship(2 , "patrol");

        let playerTwoCarrier = Ship(5 , "carrier");
        let playerTwoBattleShip = Ship(4 , "battleship");
        let playerTwoSubmarine = Ship(3 , "submarine");
        let playerTwoPatrol = Ship(2 , "patrol");

        playerOneBoard.placeShip(playerOneCarrier , 0 , 0);
        playerOneBoard.placeShip(playerOneBattleShip , 1 , 0);
        playerOneBoard.placeShip(playerOneSubmarine , 2 , 0);
        playerOneBoard.placeShip(playerOnePatrol , 3 , 0);

        playerTwoBoard.placeShip(playerTwoCarrier , 4 , 0);
        playerTwoBoard.placeShip(playerTwoBattleShip , 5 , 0);
        playerTwoBoard.placeShip(playerTwoSubmarine , 6 , 0);
        playerTwoBoard.placeShip(playerTwoPatrol , 7 , 0);




    }

    const updateTurnDisplay = () => {
        let turnElement = document.querySelector('.turn-display');
        if (game.getTurn() === 0) {
            turnElement.textContent = "Player's Turn";
        } else {
            turnElement.textContent = "CPU's Turn";
        }
        
    }

    const updatePlayerBoard = () => {
        let pageContainer = document.querySelector('.page-container');
        let gridContainer = document.querySelector('.grid-container');
        let board = game.getPlayerOne().getGameBoard();
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                let gridSquare = document.createElement('div');
                gridSquare.classList.add('grid-square');
                if (board.getSpaceAt(row , col).getOccupiedBy() !== null) {
                    if(board.getHitSquares()[row].includes(col)) {
                        gridSquare.style.backgroundColor = '#fa6a60';
                        gridContainer.appendChild(gridSquare);
                    } else {
                        gridSquare.style.backgroundColor = '#98FB98';
                        gridContainer.appendChild(gridSquare);
                    }
                } else if (board.getInactiveSquares()[row].includes(col)) {
                    gridSquare.style.backgroundColor = 'black';
                    gridContainer.appendChild(gridSquare);
                } else {
                    gridContainer.appendChild(gridSquare);
                }
            }
        }
        pageContainer.appendChild(gridContainer);
    }

    const updateComputerBoard = () => {
        let pageContainer = document.querySelector('.page-container');
        let gridContainer = document.querySelector('.grid-container');
        let board = game.getPlayerTwo().getGameBoard();
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                let gridSquare = document.createElement('div');
                gridSquare.classList.add('grid-square');
                gridSquare.dataset.value = '' + row + col;
                if (board.getSpaceAt(row , col).getOccupiedBy() !== null) {
                    if (board.getHitSquares()[row].includes(col)) {
                        gridSquare.style.backgroundColor = '#fa6a60';
                        gridContainer.appendChild(gridSquare);
                    } else {
                        gridSquare.style.backgroundColor = '#98FB98';
                        gridSquare.addEventListener('click' , squareClickedListener);
                        gridContainer.appendChild(gridSquare);
                    }
                } else if (board.getInactiveSquares()[row].includes(col)) {
                    gridSquare.style.backgroundColor = 'black';
                    gridContainer.appendChild(gridSquare);
                } else {
                    gridSquare.addEventListener('click' , squareClickedListener);
                    gridContainer.appendChild(gridSquare);
                }   
            }
        }
        pageContainer.appendChild(gridContainer);
    }

    /*
    const updateMainScreen = () => {
        let pageContainer = document.querySelector('.page-container');
        let gridContainer = document.querySelector('.grid-container');
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        let board;
        if (game.getTurn() === 0) {
            board = game.getPlayerOne().getGameBoard();
        } else {
            board = game.getPlayerTwo().getGameBoard();
        }
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                let gridSquare = document.createElement('div');
                gridSquare.classList.add('grid-square');
                gridSquare.dataset.value = '' + row + col;
                if (board.getSpaceAt(row , col).getOccupiedBy() !== null) {
                    if (board.getHitSquares()[row].includes(col)) {
                        gridSquare.style.backgroundColor = '#fa6a60';
                        gridContainer.appendChild(gridSquare);
                    } else {
                        gridSquare.style.backgroundColor = '#98FB98';
                        gridSquare.addEventListener('click' , squareClickedListener);
                        gridContainer.appendChild(gridSquare);
                    }
                } else if (board.getInactiveSquares()[row].includes(col)) {
                    gridSquare.style.backgroundColor = 'black';
                    gridContainer.appendChild(gridSquare);
                } else {
                    gridSquare.addEventListener('click' , squareClickedListener);
                    gridContainer.appendChild(gridSquare);
                }   
            }
        }
        pageContainer.appendChild(gridContainer);
        
    }
    */
    return {
        loadGame,
        updateMainScreen,
    }
}
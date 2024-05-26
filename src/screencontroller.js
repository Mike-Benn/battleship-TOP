import { GameController } from "./gamecontroller";
import { Ship } from "./ship";
export { ScreenController };

function ScreenController() {
    let game = null;
    let playAgainBtn = document.querySelector('.play-again-btn');
    // GAME LISTENERS

    function squareClickedListener(e) {
        const location = e.target.dataset.value;
        const row = location.charAt(0);
        const col = location.charAt(1);

        if (game.getTurn() === 0) {
            let board = game.getPlayerTwo().getGameBoard();
            board.receiveAttack(row , col);
            game.switchTurn();
            updateMainScreen();
        } else {
            let board = game.getPlayerTwo().getGameBoard();
            board.receiveAttack(row , col);
            game.switchTurn();
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

        updateMainScreen();


    }

    const updatePlayerBoard = () => {
        let holder = document.querySelector('.player-board');
        let gridContainer = document.querySelector('.grid-container-player');
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
        holder.appendChild(gridContainer);
    }

    const updateComputerBoard = () => {
        let holder = document.querySelector('.computer-board');
        let gridContainer = document.querySelector('.grid-container-computer');
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
        holder.appendChild(gridContainer);
    }

    const updateMainScreen = () => {
        let playerContainer = document.querySelector('.grid-container-player');
        let computerContainer = document.querySelector('.grid-container-computer');
        while (playerContainer.firstChild) {
            playerContainer.removeChild(playerContainer.firstChild);
        }

        while (computerContainer.firstChild) {
            computerContainer.removeChild(computerContainer.firstChild);
        }
        updatePlayerBoard();
        updateComputerBoard();

        gameOverCheck();

        if (game.getTurn() === 1) {
            computerTurn();
        }
    }

    const computerTurn = () => {
        game.getPlayerOne().getGameBoard().randomPlay();
        game.switchTurn();
        updateMainScreen();
    }

    const gameOverCheck = () => {
        if (game.getPlayerOne().getGameBoard().isGameOver()) {
            gameOverPopup("The CPU");
        } else if (game.getPlayerTwo().getGameBoard().isGameOver()) {
            gameOverPopup("You");
        }
    }

    const gameOverPopup = (winner) => {
        let popup = document.querySelector('#popup');
        let overlay = document.querySelector('#overlay');
        let message = document.querySelector('.game-result');
        message.textContent = `${winner} won!`; 
        popup.classList.remove('hidden');
        overlay.classList.remove('hidden');
        popup.classList.add('visible');
    }

    function playAgainListener(e) {
        let popup = document.querySelector('#popup');
        let overlay = document.querySelector('#overlay');
        popup.classList.remove('visible');
        popup.classList.add('hidden');
        overlay.classList.add('hidden');
        loadGame();

    }

    playAgainBtn.addEventListener('click' , playAgainListener);

    return {
        loadGame,
        updateMainScreen,
    }
}
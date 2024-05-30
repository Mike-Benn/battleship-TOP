import { GameController } from "./gamecontroller";
import { Ship } from "./ship";
export { ScreenController };

function ScreenController() {
    let game = null;
    let playAgainBtn = document.querySelector('.play-again-btn');
    
    const loadGame = () => {
        game = GameController();
        game.getPlayerOne().createGameBoard();
        game.getPlayerTwo().createGameBoard();

        let playerOneBoard = game.getPlayerOne().getGameBoard();

        let playerOneCarrier = Ship(5 , "carrier");
        let playerOneBattleShip = Ship(4 , "battleship");
        let playerOneSubmarine = Ship(3 , "submarine");
        let playerOnePatrol = Ship(2 , "patrol");

        playerOneBoard.placeShip(playerOneCarrier , 0 , 0);
        playerOneBoard.placeShip(playerOneBattleShip , 1 , 0);
        playerOneBoard.placeShip(playerOneSubmarine , 2 , 0);
        playerOneBoard.placeShip(playerOnePatrol , 3 , 0);

        

        updateMainScreen();
        //pregamePopup();


    }

    function placeShipListener(e) {
        let coordinates = e.target.dataset.value;
        let row = parseInt(coordinates.charAt(0));
        let col = parseInt(coordinates.charAt(1));
        let board = game.getPregameBoard();
        let shipList = board.getShipList();
        let ship = shipList[shipList.length - 1];

        if (board.validatePlacement(ship , [row , col])) {
            board.placeShip(ship , row , col);
            shipList.pop();
            updatePregameBoard();
        }

    }

    function validHighlight(headElement , row , col) {
        let orientation = ship.getOrientation();
        let row = parseInt(row);
        let col = parseInt(col);
        
        if (orientation === 0) {
            for (let i = 0; i < ship.getSize(); i++) {
                headElement.style.backgroundColor = '#98fb98';
                headElement = headElement.nextElementSibling;
            }        
        } else {
            for (let i = 0; i < ship.getSize(); i++) {
                headElement.style.backgroundColor = '#98fb98';
                headElement = document.querySelector(`.pregame-grid :nth-child(${((row + i + 1) * 10) + col})`);
            }
        }
    }

//    function invalidHighlihgt

    function validityHoverListener(e) {
        let headElement = e.target;
        let coordinates = headElement.dataset.value;
        let board = game.getPregameBoard();
        let ship = board.getShipList()[board.getShipList.length - 1];
        let row = coordinates.charAt(0);
        let col = coordinates.charAt(1);


        if (board.validatePlacement(ship , row , col)) {
            validHighlight(headElement , row , col);
        } else {
            invalidHighlight(headElement , row , col);
        }

        

    }

    const updatePregameBoard = () => {
        let gridContainer = document.querySelector('.pregame-grid');
        let board = game.getPregameBoard();
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild);
        }
        for (let row = 0; row < 10; row++) {
            for(let col = 0; col < 10; col++) {
                let pregameSquare = document.createElement('div');
                pregameSquare.classList.add('pregame-square');
                if (board.getSpaceAt(row , col).getOccupiedBy() !== null) {
                    pregameSquare.style.backgroundColor = '#444444';
                    gridContainer.appendChild(pregameSquare);
                } else {
                    pregameSquare.style.backgroundColor = '#ffffff';
                    gridContainer.appendChild(pregameSquare)
                }

            }
        }
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
        
    }
    
    const updateComputerBoard = () => {
        let holder = document.querySelector('.computer-board');
        let gridContainer = document.querySelector('.grid-container-computer');
        let board = game.getPlayerTwo().getGameBoard();
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                let gridSquare = document.createElement('div');
                gridSquare.classList.add('grid-square');
                gridSquare.classList.add('computer-square');
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
    const pregamePopup = () => {
        let popup = document.querySelector('#pregame');
        let overlay = document.querySelector('#overlay');
        let pregameMessage = document.querySelector('.pregame-message');
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

    playAgainBtn.addEventListener('click' , playAgainListener);

    return {
        loadGame,
        updateMainScreen,
    }
}
import { Ship } from "./ship";
import { GameSpace } from "./gamespace";
export { GameBoard };

function GameBoard() {
    let board = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];
    let hitSquares = {
        0 : [],
        1 : [],
        2 : [],
        3 : [],
        4 : [],
        5 : [],
        6 : [],
        7 : [],
        8 : [],
        9 : [],
    }
    let inactiveSquares = {
        0 : [],
        1 : [],
        2 : [],
        3 : [],
        4 : [],
        5 : [],
        6 : [],
        7 : [],
        8 : [],
        9 : []
    };

    let activeSquares = [];

    let shipCoordinates = {
        0 : [],
        1 : [],
        2 : [],
        3 : [],
        4 : [],
        5 : [],
        6 : [],
        7 : [],
        8 : [],
        9 : [],
    }
    
    let sunkenShips = [];

    const getBoard = () => board;

    const getHitSquares = () => hitSquares;

    const getShipCoordinates = () => shipCoordinates;

    const getActiveSquares = () => activeSquares;

    const getInactiveSquares = () => inactiveSquares;

    const getSunkenShips = () => sunkenShips;

    const resetBoard = () => {
        board = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
    };

    const resetCoordinates = () => shipCoordinates = {
        0 : [],
        1 : [],
        2 : [],
        3 : [],
        4 : [],
        5 : [],
        6 : [],
        7 : [],
        8 : [],
        9 : [],
    };
    
    const resetInactiveSquares = () => inactiveSquares = {
        0 : [],
        1 : [],
        2 : [],
        3 : [],
        4 : [],
        5 : [],
        6 : [],
        7 : [],
        8 : [],
        9 : [],

    }

    const generateBoard = () => {
        resetBoard();
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board.length; col++) {
                let space = GameSpace(row , col);
                let play = [row , col];
                activeSquares.push(play);
                board[row][col] = space;

            }
        }
    }

    const getSpaceAt = (row , col) => {
        if (row < 0 || row > 9 || col < 0 || col > 9) {
            return "The coordinates entered are out of bounds, please choose a row and column value between 0 and 9."
        } else {
            return board[row][col];
        }
    }

    

    const placeShip = (ship , row , col) => {
        
        let orientation = ship.getOrientation();

        if (orientation === "horizontal") {
            for (let i = 0; i < ship.getSize(); i++) {
                shipCoordinates[row].push(col);
                getSpaceAt(row , col).setOccupiedBy(ship);
                col++;
            }
        } else {
            for (let i = 0; i < ship.getSize(); i++) {
                shipCoordinates[row].push(col);
                getSpaceAt(row , col).setOccupiedBy(ship);
                row++;

            }
        }

    }

    const receiveAttack = (row , col) => {
        let coordinatesToCheck = shipCoordinates[row];
        col = parseInt(col);
        
        
        if (coordinatesToCheck.includes(col)) {
            let ship = getSpaceAt(row , col).getOccupiedBy();
            ship.hit();
            if (ship.isSunk()) {
                sunkenShips.push(ship);
            }
            // Might need to add statement that removes the ship from the gamespace where the hit took place
            inactiveSquares[row].push(col);
            hitSquares[row].push(col);
        } else {
            inactiveSquares[row].push(col);
        }
    }

    const isGameOver = () => {
        if (sunkenShips.length === 4) {
            return true;
        } else {
            return false;
        }
    }

    const randomPlay = () => {
        let max = activeSquares.length;
        let randomNumber = Math.floor(Math.random() * max);
        let play = activeSquares[randomNumber];
        receiveAttack(play[0] , play[1]);
        activeSquares.splice(randomNumber , 1);
    }

    return {
        getBoard,
        getShipCoordinates,
        getSpaceAt,
        getHitSquares,
        getActiveSquares,
        getInactiveSquares,
        getSunkenShips,
        resetBoard,
        resetCoordinates,
        resetInactiveSquares,
        generateBoard,
        placeShip,
        receiveAttack,
        isGameOver,
        randomPlay,
        
        

    }
}
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

    const generateRandomBoard = () => {
        resetBoard();
        generateBoard();
        const shipsArray = [["carrier" , 5] , ["battleship" , 4] , ["submarine" , 3] , ["patrol" , 2]]
        const masterBoardCopy = [...activeSquares];
        const validChecks = [...masterBoardCopy];

        for (let i = 0; i < 4; i++) {
            let ship = shipsArray[i];
            let name = ship[0];
            let length = ship[1];
            let orientation = Math.floor(Math.random() * 2);
            if (orientation === 0) {
                while (true) {
                    let index = Math.floor(Math.random() * validChecks.length);
                    let coordinates = validChecks[index];
                    
                    break;

                }
            } else if (orientation === 1) {
                while (true) {

                }
            }
        }

    }

    const validatePlacement = (ship , coordinates) => {
        let row = coordinates[0];
        let col = coordinates[1];

        if (ship.getOrientation() === 0) {
            for (let i = 0; i < ship.getSize(); i++) {
                if (!validateSquare(row , col)) {
                    return false;
                }
                col++;
            }
            return true;
        } else if (ship.getOrientation() === 1) {
            for (let i = 0; i < ship.getSize(); i++) {
                if (!validateSquare(row , col)) {
                    return false;
                }
                row++;
            }
            return true;
        }
    }

    const validateSquare = (row , col) => {
        if (row > 9 || col > 9) {
            return false;
        } else if (getSpaceAt(row , col).getOccupiedBy() !== null) {
            return false;
        }
        return true;
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

        if (orientation === 0) {
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
        validatePlacement,
        validateSquare,
        placeShip,
        receiveAttack,
        isGameOver,
        randomPlay,
        
        

    }
}


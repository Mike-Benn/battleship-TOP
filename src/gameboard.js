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

    let shipCoordinates = new Map();
    

    const getBoard = () => board;

    const getShipCoordinates = () => shipCoordinates;

    const getInactiveSquares = () => inactiveSquares;

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

    const resetCoordinates = () => shipCoordinates = new Map();
    
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


    }

    return {
        getBoard,
        getShipCoordinates,
        getSpaceAt,
        getInactiveSquares,
        resetBoard,
        resetCoordinates,
        resetInactiveSquares,
        generateBoard,
        
        

    }
}
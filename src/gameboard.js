import { Ship } from "./ship";
import { GameSpace } from "./gamespace";
export { GameBoard };

function GameBoard() {
  let board = [[], [], [], [], [], [], [], [], [], []];
  let hitSquares = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };
  let inactiveSquares = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };

  let activeSquares = [];

  let shipCoordinates = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };

  let sunkenShips = [];

  let shipList = [];

  const getHitSquares = () => hitSquares;

  const getActiveSquares = () => activeSquares;

  const getInactiveSquares = () => inactiveSquares;

  const getSunkenShips = () => sunkenShips;

  const getShipList = () => shipList;

  const addShip = (ship) => shipList.push(ship);

  const resetBoard = () => {
    board = [[], [], [], [], [], [], [], [], [], []];
  };

  const generateBoard = () => {
    resetBoard();
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board.length; col++) {
        let space = GameSpace();
        let play = [row, col];
        activeSquares.push(play);
        board[row][col] = space;
      }
    }
  };

  const generateRandomBoard = () => {
    resetBoard();
    generateBoard();
    let coordinateList = [...activeSquares];
    const shipsArray = [
      Ship(5, "carrier"),
      Ship(4, "battleship"),
      Ship(3, "submarine"),
      Ship(2, "patrol"),
    ];
    for (let i = 0; i < shipsArray.length; i++) {
      let ship = shipsArray[i];
      ship.randomOrientation();
      while (true) {
        let index = Math.floor(Math.random() * coordinateList.length);
        let coordinate = coordinateList[index];
        if (validatePlacement(ship, [coordinate[0], coordinate[1]])) {
          placeShip(ship, coordinate[0], coordinate[1]);
          break;
        } else {
          coordinateList.splice(index, 1);
        }
      }
      coordinateList = [...activeSquares];
    }
  };

  const validatePlacement = (ship, coordinates) => {
    let row = coordinates[0];
    let col = coordinates[1];

    if (ship.getOrientation() === 0) {
      for (let i = 0; i < ship.getSize(); i++) {
        if (!validateSquare(row, col)) {
          return false;
        }
        col++;
      }
      return true;
    } else if (ship.getOrientation() === 1) {
      for (let i = 0; i < ship.getSize(); i++) {
        if (!validateSquare(row, col)) {
          return false;
        }
        row++;
      }
      return true;
    }
  };

  const validateSquare = (row, col) => {
    if (row > 9 || col > 9) {
      return false;
    } else if (getSpaceAt(row, col).getOccupiedBy() !== null) {
      return false;
    }
    return true;
  };

  const getSpaceAt = (row, col) => {
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      return "The coordinates entered are out of bounds, please choose a row and column value between 0 and 9.";
    } else {
      return board[row][col];
    }
  };

  const placeShip = (ship, row, col) => {
    addShip(ship);
    let orientation = ship.getOrientation();

    if (orientation === 0) {
      for (let i = 0; i < ship.getSize(); i++) {
        shipCoordinates[row].push(col);
        getSpaceAt(row, col).setOccupiedBy(ship);
        col++;
      }
    } else {
      for (let i = 0; i < ship.getSize(); i++) {
        shipCoordinates[row].push(col);
        getSpaceAt(row, col).setOccupiedBy(ship);
        row++;
      }
    }
  };

  const receiveAttack = (row, col) => {
    let coordinatesToCheck = shipCoordinates[row];
    col = parseInt(col);

    if (coordinatesToCheck.includes(col)) {
      let ship = getSpaceAt(row, col).getOccupiedBy();
      ship.hit();
      if (ship.isSunk()) {
        sunkenShips.push(ship);
      }
      inactiveSquares[row].push(col);
      hitSquares[row].push(col);
    } else {
      inactiveSquares[row].push(col);
    }
  };

  const isGameOver = () => {
    if (sunkenShips.length === 4) {
      return true;
    } else {
      return false;
    }
  };

  const randomPlay = () => {
    let max = activeSquares.length;
    let randomNumber = Math.floor(Math.random() * max);
    let play = activeSquares[randomNumber];
    receiveAttack(play[0], play[1]);
    activeSquares.splice(randomNumber, 1);
  };

  return {
    getSpaceAt,
    getHitSquares,
    getActiveSquares,
    getInactiveSquares,
    getSunkenShips,
    getShipList,
    addShip,
    resetBoard,
    generateBoard,
    generateRandomBoard,
    validatePlacement,
    validateSquare,
    placeShip,
    receiveAttack,
    isGameOver,
    randomPlay,
  };
}

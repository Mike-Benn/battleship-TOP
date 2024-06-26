import { GameBoard } from "../src/gameboard";
import { Ship } from "../src/ship";

//getBoard()

test('Returns the game board array.' , () => {
    let gameboard = GameBoard();

    expect(gameboard.getBoard()).toStrictEqual([
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]);

});

//getHitSquares()

test('Returns an object of all squares where a hit took place.' , () => {
    let gameboard = GameBoard();
    let testObject = {
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

    expect(gameboard.getHitSquares()).toStrictEqual(testObject);
})

//getShipCoordinates()

test('Returns an object of all current ship locations.' , () => {
    let gameboard = GameBoard();
    let testObject= {
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

    expect(gameboard.getShipCoordinates()).toStrictEqual(testObject);

})

//getActiveSquares()

test('Returns an array of all active squares.' , () => {
    let gameboard = GameBoard();
    let testArray = [];
    expect(gameboard.getActiveSquares()).toStrictEqual(testArray);
})

//getInactiveSquares()

test('Returns an object representing already played moves.' , () => {
    let gameboard = GameBoard();
    gameboard.getInactiveSquares()[0].push("test");
    gameboard.getInactiveSquares()[9].push("test");

    expect(gameboard.getInactiveSquares()[0][0]).toBe("test");
    expect(gameboard.getInactiveSquares()[9][0]).toBe("test");
})

//getShipList()

test('Returns a list of all the possible ships to be placed' , () => {
    let gameboard = GameBoard();
    let shipList = gameboard.getShipList();
    let test = [Ship(2 , "patrol") , Ship(3 , "submarine") , Ship(4 , "battleship") , Ship(5 , "carrier")];
    expect(shipList[0].getType()).toBe("patrol");
    expect(shipList[1].getType()).toBe("submarine");
    expect(shipList[2].getType()).toBe("battleship");
    expect(shipList[3].getType()).toBe("carrier");

})

//resetInactiveSquares()

test('Reset inactive squares object to original state.' , () => {
    let gameboard = GameBoard();
    gameboard.getInactiveSquares()[0].push("test");
    gameboard.getInactiveSquares()[9].push("test");

    expect(gameboard.getInactiveSquares()[0][0]).toBe("test");
    expect(gameboard.getInactiveSquares()[9][0]).toBe("test");
    gameboard.resetInactiveSquares();
    expect(gameboard.getInactiveSquares()[0]).toStrictEqual([]);
})

//resetBoard()

test('Resets the game board array.' , () => {
    let gameboard = GameBoard();
    gameboard.getBoard()[0][0] = 1;
    gameboard.resetBoard();

    expect(gameboard.getBoard()).toStrictEqual([
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]);

});

//resetCoordinates()

test('Resets the list of ship coordinates.' , () => {
    let gameboard = GameBoard();
    gameboard.getShipCoordinates()['a'] = 1;

    expect(gameboard.getShipCoordinates().hasOwnProperty('a')).toBe(true);
    gameboard.resetCoordinates();
    expect(gameboard.getShipCoordinates().hasOwnProperty('a')).toBe(false);
})

//generateBoard()

test('Generates a game board array of game space objects.' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();

    expect(gameboard.getBoard()[0][0].isSpaceActive()).toBe(true);
    expect(gameboard.getActiveSquares()[0]).toStrictEqual([0 , 0]);
    expect(gameboard.getActiveSquares().length).toBe(100);
})

//getSpaceAt()

test('Gets game space at coordinates.' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();

    expect(gameboard.getSpaceAt(1 , 1).getLocation()).toStrictEqual([1 , 1]);
});

//placeShip()

test('Places horizontal ship on the board and updates appropriate variables' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();

    let ship = Ship(5 , "carrier");
    gameboard.placeShip(ship , 1 , 1);

    expect(gameboard.getSpaceAt(1 , 1).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(1 , 2).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(1 , 3).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(1 , 4).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(1 , 5).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(1 , 6).getOccupiedBy()).toBe(null);
    expect(gameboard.getSpaceAt(2 , 1).getOccupiedBy()).toBe(null);
    

})

test('Places vertical ship on the board and updates appropriate variables' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();

    let ship = Ship(5 , "carrier");
    ship.toggleOrientation();
    gameboard.placeShip(ship , 1 , 1);

    expect(gameboard.getSpaceAt(1 , 1).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(2 , 1).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(3 , 1).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(4 , 1).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(5 , 1).getOccupiedBy()).toBe(ship);
    expect(gameboard.getSpaceAt(6 , 1).getOccupiedBy()).toBe(null);
    expect(gameboard.getSpaceAt(1 , 2).getOccupiedBy()).toBe(null);
    

})

//receiveAttack()

test('Receives attack from player and it\'s a hit.' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();

    let ship = Ship(1 , "test");
    gameboard.placeShip(ship , 1 , 1);

    expect(gameboard.getSunkenShips().length).toBe(0);
    gameboard.receiveAttack(1 , 1);
    let inactiveSquares = gameboard.getInactiveSquares();

    expect(inactiveSquares[1][0]).toBe(1);
    expect(inactiveSquares[1][1]).toBe(undefined);
    expect(inactiveSquares[2][0]).toBe(undefined);
    expect(ship.getHealth()).toBe(0);
    expect(gameboard.getSunkenShips().length).toBe(1);

})

test('Receives attack from player and it\'s a miss.' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();

    let ship = Ship(5 , "test");
    gameboard.placeShip(ship , 1 , 1);

    gameboard.receiveAttack(2 , 1);
    let inactiveSquares = gameboard.getInactiveSquares();

    expect(inactiveSquares[2][0]).toBe(1);
    expect(inactiveSquares[2][1]).toBe(undefined);
    expect(inactiveSquares[1][0]).toBe(undefined);
    expect(ship.getHealth()).toBe(5);
    expect(gameboard.getSunkenShips().length).toBe(0);
})

//isGameOver()

test('Returns true or false whether or not all ships are sunk.' , () => {
    let gameboard = GameBoard();

    expect(gameboard.isGameOver()).toBe(false);
    gameboard.getSunkenShips().push(1);
    gameboard.getSunkenShips().push(1);
    gameboard.getSunkenShips().push(1);
    expect(gameboard.isGameOver()).toBe(false);
    gameboard.getSunkenShips().push(1);
    expect(gameboard.isGameOver()).toBe(true);

})

//randomPlay() 

test('Makes a random play, pulling the play from the active squares variable.' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();
    gameboard.randomPlay();

    expect(gameboard.getActiveSquares().length).toBe(99);

})

//validateSquare()

test('Returns a boolean based on if a gamespace is in bounds and unoccupied.' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();
    let ship = Ship(5 , "test");

    expect(gameboard.validateSquare(0 , 0)).toBe(true);
    gameboard.placeShip(ship , 0 , 0);
    expect(gameboard.validateSquare(0 , 0)).toBe(false);
    expect(gameboard.validateSquare(10 , 9)).toBe(false);
    expect(gameboard.validateSquare(9 , 10)).toBe(false);

})

test('Returns a boolean based on if a set of gamespaces are all in bounds and unoccupied.' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();
    let ship = Ship(5 , "test");
    
    expect(gameboard.validatePlacement(ship , [0 , 0])).toBe(true);
    expect(gameboard.validatePlacement(ship , [8 , 1])).toBe(true);
    expect(gameboard.validatePlacement(ship , [1 , 8])).toBe(false);
    expect(gameboard.validatePlacement(ship , [9 , 9])).toBe(false);
    expect(gameboard.validatePlacement(ship , [3 , 3])).toBe(true);

    gameboard.generateBoard();
    ship.toggleOrientation();

    expect(gameboard.validatePlacement(ship , [0 , 0])).toBe(true);
    expect(gameboard.validatePlacement(ship , [8 , 1])).toBe(false);
    expect(gameboard.validatePlacement(ship , [1 , 8])).toBe(true);
    expect(gameboard.validatePlacement(ship , [9 , 9])).toBe(false);
    expect(gameboard.validatePlacement(ship , [3 , 3])).toBe(true);
    
})
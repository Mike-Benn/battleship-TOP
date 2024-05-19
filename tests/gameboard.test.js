import { GameBoard } from "../src/gameboard";
import { Ship } from "../src/ship";
import { GameSpace } from "../src/gamespace";
import { TIME_UNITS_LEN } from "cron/dist/constants";

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

test('Returns a map of all current ship locations.' , () => {
    let gameboard = GameBoard();
    let testMap = new Map();

    expect(gameboard.getShipCoordinates()).toStrictEqual(testMap);

})

test('Returns an object representing already played moves.' , () => {
    let gameboard = GameBoard();
    gameboard.getInactiveSquares()[0].push("test");
    gameboard.getInactiveSquares()[9].push("test");

    expect(gameboard.getInactiveSquares()[0][0]).toBe("test");
    expect(gameboard.getInactiveSquares()[9][0]).toBe("test");
})

test('Reset inactive squares object to original state.' , () => {
    let gameboard = GameBoard();
    gameboard.getInactiveSquares()[0].push("test");
    gameboard.getInactiveSquares()[9].push("test");

    expect(gameboard.getInactiveSquares()[0][0]).toBe("test");
    expect(gameboard.getInactiveSquares()[9][0]).toBe("test");
    gameboard.resetInactiveSquares();
    expect(gameboard.getInactiveSquares()[0]).toStrictEqual([]);
})

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

test('Resets the list of ship coordinates.' , () => {
    let gameboard = GameBoard();
    gameboard.getShipCoordinates().set('a' , 1);

    expect(gameboard.getShipCoordinates().has('a')).toBe(true);
    gameboard.resetCoordinates();
    expect(gameboard.getShipCoordinates().has('a')).toBe(false);
})

test('Generates a game board array of game space objects.' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();

    expect(gameboard.getBoard()[0][0].isSpaceActive()).toBe(true);
})

test('Gets game space at coordinates.' , () => {
    let gameboard = GameBoard();
    gameboard.generateBoard();

    expect(gameboard.getSpaceAt(1 , 1).getLocation()).toStrictEqual([1 , 1]);
});


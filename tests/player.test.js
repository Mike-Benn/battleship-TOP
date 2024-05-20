import { GameBoard } from "../src/gameboard";
import { Player } from "../src/player";




//getName() , getGameBoard() , getPlayerType()

test('Returns the name, the game board, and the player type.' , () => {
    let testPlayer = Player("Test" , "Human");

    expect(testPlayer.getName()).toBe("Test");
    expect(testPlayer.getGameBoard()).toBeNull();
    expect(testPlayer.getPlayerType()).toBe("Human");
})

//createBoard()

test('Creates a game board and assigns it to the player.' , () => {
    let testPlayer = Player("Test" , "Human");

    testPlayer.createGameBoard();
    expect(testPlayer.getGameBoard()).not.toBeNull();

})

//resetBoard()

test('Resets player game board back to it\'s original state when player was created' , () => {
    let testPlayer = Player("Test" , "Human");

    testPlayer.createGameBoard();
    testPlayer.resetGameBoard();
    expect(testPlayer.getGameBoard()).toBeNull();
})
import { GameController } from "../src/gamecontroller";

//getTurn() getPhase()

test('Testing the getters of the function.' , () => {
    let game = GameController();
    expect(game.getPhase()).toBe("pregame");
    expect(game.getTurn()).toBe(0);
})

//switchTurn()

test('Switches the turn of the game between players' , () => {
    let game = GameController();
    expect(game.getTurn()).toBe(0);

    game.switchTurn();
    expect(game.getTurn()).toBe(1);
    
    game.switchTurn();
    expect(game.getTurn()).toBe(0);
    
})

//startGame()

test('Starts the game by changing the phase from pregame to live.' , () => {
    let game = GameController();
    game.startGame();
    expect(game.getPhase()).toBe("live");
})
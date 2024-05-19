import { GameSpace } from "../src/gamespace";

test('Returns an array of the location of the ship.' , () => {
    let gamespace = GameSpace(3 , 2);
    expect(gamespace.getLocation()).toStrictEqual([3 , 2]);

})

test('Returns the name of the ship that is occupying that space.' , () => {
    let gamespace = GameSpace(3 , 2);
    gamespace.setOccupiedBy('battleship');
    expect(gamespace.getOccupiedBy()).toBe('battleship');
})

test('Returns if a space is active or not.' , () => {
    let gamespace = GameSpace(3 , 2);
    expect(gamespace.isSpaceActive()).toBe(true);
})

test('Sets location of the space.' , () => {
    let gamespace = GameSpace(3 , 2);
    gamespace.setLocation(2 , 3);
    expect(gamespace.getLocation()).toStrictEqual([2 , 3]);
})

test('Toggles a space from active to inactive.' , () => {
    let gamespace = GameSpace(3 , 2);
    gamespace.toggleSpaceActive();
    expect(gamespace.isSpaceActive()).toBe(false);
})
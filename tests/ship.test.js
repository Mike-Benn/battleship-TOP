import { Ship } from '../src/ship';



test('Returns the size of the ship.' , () => {
    let ship = Ship(5);
    expect(ship.getSize()).toBe(5);
});

test('Returns the health of the ship.' , () => {
    let ship = Ship(5);
    expect(ship.getHealth()).toBe(5);
});

test('Returns if a ship is sunk or not.' , () => {
    let ship = Ship(5);
    expect(ship.isSunk()).toBe(false);
});

test('Ship correctly takes one damage and health value is updated.' , () => {
    let ship = Ship(5);
    ship.hit();
    expect(ship.getHealth()).toBe(4);


})
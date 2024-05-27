import { Ship } from '../src/ship';



test('Returns the size of the ship.' , () => {
    let ship = Ship(5 , "carrier");
    expect(ship.getSize()).toBe(5);
});

test('Returns the health of the ship.' , () => {
    let ship = Ship(5 , "carrier");
    expect(ship.getHealth()).toBe(5);
});

test('Returns the type of the ship.' , () => {
    let ship = Ship(5 , "carrier");
    expect(ship.getType()).toBe("carrier");   
})

test('Returns the orientation/direction of the ship.' , () => {
    let ship = Ship(5 , "carrier");
    expect(ship.getOrientation()).toBe(0);
})

test('Returns the ship\'s location variable' , () => {
    let ship = Ship(5 , "carrier");
    expect(ship.getLocation()).toBe(null);
})

test('Sets the ship\'s location variable.' , () => {
    let ship = Ship(5 , "carrier");
    ship.setLocation([
        [1 , 1],
        [1 , 2],
        [1 , 3],
        [1 , 4],
        [1 , 5]
    ]);
    expect(ship.getLocation()[0]).toStrictEqual([1 , 1]);
    expect(ship.getLocation()[1]).toStrictEqual([1 , 2]);
    expect(ship.getLocation()[2]).toStrictEqual([1 , 3]);
    expect(ship.getLocation()[3]).toStrictEqual([1 , 4]);
    expect(ship.getLocation()[4]).toStrictEqual([1 , 5]);

});

test('Toggles the orientation of the ship between horizontal and vertical.' , () => {
    let ship = Ship(5 , "carrier");
    ship.toggleOrientation();
    expect(ship.getOrientation()).toBe(1);
})

test('Returns if a ship is sunk or not.' , () => {
    let ship = Ship(5 , "carrier");
    expect(ship.isSunk()).toBe(false);
});

test('Ship correctly takes one damage and health value is updated.' , () => {
    let ship = Ship(5 , "carrier");
    ship.hit();
    expect(ship.getHealth()).toBe(4);

})

test('Ship correctly takes one damage and sunk value is set to true.' , () => {
    let ship = Ship(1 , "carrier");
    ship.hit();
    expect(ship.getHealth()).toBe(0);
    expect(ship.isSunk()).toBe(true);
})
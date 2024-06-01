import { ShipList } from "../src/shiplist";

//getShips()

test('Returns the array containing the current ships in the list.' , () => {
    let testList = ShipList();
    expect(testList.getShips().length).toBe(4);
    expect(testList.getShips()[0].getType()).toBe("patrol");
    expect(testList.getShips()[1].getType()).toBe("submarine");
    expect(testList.getShips()[2].getType()).toBe("battleship");
    expect(testList.getShips()[3].getType()).toBe("carrier");
})

//removeShip()

test('Modifies the array by removing the last ship in the list.' , () => {
    let testList = ShipList();
    expect(testList.getShips().length).toBe(4);
    testList.removeShip();
    expect(testList.getShips().length).toBe(3);
    testList.removeShip();
    expect(testList.getShips().length).toBe(2);
    testList.removeShip();
    expect(testList.getShips().length).toBe(1);
    testList.removeShip();
    expect(testList.getShips().length).toBe(0);
    testList.removeShip();
    expect(testList.getShips().length).toBe(0);
})
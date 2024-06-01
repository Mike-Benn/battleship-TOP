import { Ship } from "./ship";
export { ShipList };

function ShipList() {
    let ships = [Ship(2 , "patrol") , Ship(3 , "submarine") , Ship(4 , "battleship") , Ship(5 , "carrier")];

    const getShips = () => ships;

    const removeShip = () => {
        if (ships.length > 0) {
            ships.pop();
        }
    }

    return {
        getShips,
        removeShip,
    }

}
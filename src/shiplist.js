import { Ship } from "./ship";
export { ShipList };

function ShipList() {
  let ships = [
    Ship(5, "carrier"),
    Ship(4, "battleship"),
    Ship(3, "submarine"),
    Ship(2, "patrol"),
  ];

  const getShips = () => ships;

  const removeShip = () => {
    if (ships.length > 0) {
      ships.shift();
    }
  };

  return {
    getShips,
    removeShip,
  };
}

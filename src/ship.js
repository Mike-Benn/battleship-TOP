export { Ship };

function Ship(length, shipType) {
  const size = length;
  const type = shipType;
  let health = length;
  let sunkStatus = false;
  let orientation = 0;

  const getSize = () => size;

  const getHealth = () => health;

  const getType = () => type;

  const getOrientation = () => orientation;

  const toggleOrientation = () => {
    if (orientation === 0) {
      orientation = 1;
    } else {
      orientation = 0;
    }
  };

  const randomOrientation = () => {
    if (Math.floor(Math.random() * 2) === 0) {
      orientation = 0;
    } else {
      orientation = 1;
    }
  };

  const isSunk = () => sunkStatus;

  const hit = () => {
    if (isSunk() === false) {
      health--;
      if (health <= 0) {
        sunkStatus = true;
      }
    }
  };

  return {
    getSize,
    getHealth,
    getType,
    getOrientation,
    toggleOrientation,
    randomOrientation,
    isSunk,
    hit,
  };
}

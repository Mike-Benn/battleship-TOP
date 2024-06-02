export { GameSpace };

function GameSpace(row, col) {
  let location = [row, col];
  let occupiedBy = null;
  let active = true;

  const getLocation = () => location;

  const getOccupiedBy = () => occupiedBy;

  const isSpaceActive = () => active;

  const setLocation = (row, col) => {
    location = [row, col];
  };

  const setOccupiedBy = (ship) => (occupiedBy = ship);

  const toggleSpaceActive = () => {
    active = false;
  };
  return {
    getLocation,
    getOccupiedBy,
    isSpaceActive,
    setLocation,
    setOccupiedBy,
    toggleSpaceActive,
  };
}

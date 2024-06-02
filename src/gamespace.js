export { GameSpace };

function GameSpace() {
  let occupiedBy = null;

  const getOccupiedBy = () => occupiedBy;

  const setOccupiedBy = (ship) => (occupiedBy = ship);

  return {
    getOccupiedBy,
    setOccupiedBy,
  };
}

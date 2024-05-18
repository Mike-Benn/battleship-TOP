export { GameSpace };


function GameSpace() {

    let location = null;
    let occupiedBy = null;


    const getLocation = () => location;

    const getOccupiedBy = () => occupiedBy;

    const setLocation = (row , col) => {
        location = [row , col];
    }

    const setOccupiedBy = (ship) => occupiedBy = ship;

    return {
        getLocation,
        getOccupiedBy,
        setLocation,
        setOccupiedBy
    }


}

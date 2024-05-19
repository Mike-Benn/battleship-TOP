export { Ship };

function Ship(length , shipType) {
    const size = length;
    const type = shipType;
    let health = length;
    let sunkStatus = false;
    let orientation = "horizontal";
    let location = null;

    const getSize = () => size;

    const getHealth = () => health;

    const getType = () => type;

    const getOrientation = () => orientation;

    const getLocation = () => location;

    const setLocation = (locationVal) => location = locationVal; 

    const toggleOrientation = () => {
        if (orientation === "horizontal") {
            orientation = "vertical";
        } else {
            orientation = "horizontal";
        }
    }
    
    const isSunk = () => sunkStatus;

    const hit = () => {
        if (isSunk() === false) {
            health--;
            if (health <= 0) {
                sunkStatus = true;
            }
        }
    }


    return {
        getSize,
        getHealth,
        getType,
        getOrientation,
        getLocation,
        setLocation,
        toggleOrientation,
        isSunk,
        hit,
        
    }
    
}




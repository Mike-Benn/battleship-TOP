export { Ship };

function Ship(length , shipType) {
    const size = length;
    const type = shipType;
    let health = length;
    let sunkStatus = false;
    let orientation = "horizontal";

    const getSize = () => size;

    const getHealth = () => health;

    const getType = () => type;

    const getOrientation = () => orientation;

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
        toggleOrientation,
        isSunk,
        hit,
        
    }
    
}




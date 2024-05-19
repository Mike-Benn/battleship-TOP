export { Ship };

function Ship(length) {
    const size = length;
    let health = length;
    let sunkStatus = false;

    const getSize = () => size;

    const getHealth = () => health;

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
        isSunk,
        hit,
        
    }
    
}




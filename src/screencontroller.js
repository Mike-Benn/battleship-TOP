import { GameController } from "./gamecontroller";
import { ShipList } from "./shiplist";
import { Ship } from "./ship";
export { ScreenController };

function ScreenController() {
  let game = null;
  let highlightedSquares = [];
  let shipList = ShipList();

  let playAgainBtn = document.querySelector(".play-again-btn");
  let rotateBtn = document.querySelector(".rotate-btn");
  let overlay = document.querySelector("#overlay");
  let pregameMessage = document.querySelector("#pregame");

  function playAgainListener(e) {
    let popup = document.querySelector("#popup");
    let overlay = document.querySelector("#overlay");
    popup.classList.remove("visible");
    overlay.classList.remove("visible");
    popup.classList.add("hidden");
    overlay.classList.add("hidden");
    game = null;
    highlightedSquares = [];
    shipList = ShipList();
    loadGame();
    resetShipDisplay();
  }

  const loadGame = () => {
    game = GameController();
    game.getPlayerOne().createGameBoard();
    game.getPlayerTwo().createGameBoard();
    game.getPregameBoard().generateBoard();
    overlay.classList.remove("hidden");
    pregameMessage.classList.remove("hidden");
    overlay.classList.add("visible");
    pregameMessage.classList.add("visible");

    updateMainScreen();
    updatePregameBoard();
  };

  function rotateShipListener(e) {
    //let shipList = game.getPregameBoard().getShipList();
    let ships = shipList.getShips();
    let ship = ships[0];
    ship.toggleOrientation();
  }

  function placeShipListener(e) {
    let coordinates = e.target.dataset.value;
    let row = parseInt(coordinates.charAt(0));
    let col = parseInt(coordinates.charAt(1));
    let board = game.getPregameBoard();
    //let shipList = board.getShipList();
    let ships = shipList.getShips();
    let ship = ships[0];

    if (board.validatePlacement(ship, [row, col])) {
      board.placeShip(ship, row, col);
      shipList.removeShip();

      updatePregameBoard();
    }
  }
  function resetHighlightListener(e) {
    for (let i = 0; i < highlightedSquares.length; i++) {
      let square = highlightedSquares[i];
      let coordinates = square.dataset.value;
      let row = coordinates.charAt(0);
      let col = coordinates.charAt(1);
      if (
        game.getPregameBoard().getSpaceAt(row, col).getOccupiedBy() === null
      ) {
        square.style.backgroundColor = "#ffffff";
      } else {
        square.style.backgroundColor = "#444444";
      }
    }
    highlightedSquares = [];
  }

  function validityHighlightListener(e) {
    let element = e.target;
    let coordinates = e.target.dataset.value;
    let startingRow = parseInt(coordinates.charAt(0));
    let startingCol = parseInt(coordinates.charAt(1));
    let board = game.getPregameBoard();
    //let shipList = board.getShipList();
    let ships = shipList.getShips();
    let ship = ships[0];
    let shipSize = ship.getSize();
    // If ship can be validly placed in the hovered over position
    if (board.validatePlacement(ship, [startingRow, startingCol])) {
      let row = startingRow;
      let col = startingCol;
      let space = board.getSpaceAt(row, col);
      // If ship can be validly placed here and is facing horizontally
      if (ship.getOrientation() === 0) {
        for (let i = 0; i < shipSize; i++) {
          if (element) {
            element.style.backgroundColor = "#98fb98";
            highlightedSquares.push(element);
          } else {
            break;
          }
          col++;
          element = document.querySelector(`[data-value^="${row}${col}"]`);
        }
        // If ship can be validly placed here and is facing vertically
      } else {
        for (let i = 0; i < shipSize; i++) {
          if (element) {
            element.style.backgroundColor = "#98fb98";
            highlightedSquares.push(element);
          } else {
            break;
          }
          row++;
          element = document.querySelector(`[data-value^="${row}${col}"]`);
        }
      }
      // If ship cannot be validly placed in the hovered over position
    } else {
      let row = startingRow;
      let col = startingCol;
      let space = board.getSpaceAt(row, col);
      // If ship cannot be validly placed here and is facing horizontally

      if (ship.getOrientation() === 0) {
        for (let i = 0; i < shipSize; i++) {
          if (element) {
            element.style.backgroundColor = "#fa6a60";
            highlightedSquares.push(element);
          } else {
            break;
          }
          col++;
          element = document.querySelector(`[data-value^="${row}${col}"]`);
        }
        // If ship cannot be validly placed here and is facing vertically
      } else {
        for (let i = 0; i < shipSize; i++) {
          if (element) {
            element.style.backgroundColor = "#fa6a60";
            highlightedSquares.push(element);
          } else {
            break;
          }
          row++;
          element = document.querySelector(`[data-value^="${row}${col}"]`);
        }
      }
    }
  }

  const updatePregameBoard = () => {
    if (shipList.getShips().length !== 0) {
      let gridContainer = document.querySelector(".pregame-grid");
      let board = game.getPregameBoard();
      while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
      }
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          let pregameSquare = document.createElement("div");
          pregameSquare.classList.add("pregame-square");
          pregameSquare.dataset.value = "" + row + col;
          if (board.getSpaceAt(row, col).getOccupiedBy() !== null) {
            pregameSquare.style.backgroundColor = "#444444";
            pregameSquare.addEventListener(
              "mouseenter",
              validityHighlightListener,
            );
            pregameSquare.addEventListener(
              "mouseleave",
              resetHighlightListener,
            );
            gridContainer.appendChild(pregameSquare);
          } else {
            pregameSquare.style.backgroundColor = "#ffffff";
            pregameSquare.addEventListener("click", placeShipListener);
            pregameSquare.addEventListener(
              "mouseenter",
              validityHighlightListener,
            );
            pregameSquare.addEventListener(
              "mouseleave",
              resetHighlightListener,
            );
            gridContainer.appendChild(pregameSquare);
          }
        }
      }
    } else {
      overlay.classList.remove("visible");
      pregameMessage.classList.remove("visible");
      overlay.classList.add("hidden");
      pregameMessage.classList.add("hidden");
      game.getPlayerOne().setGameBoard(game.getPregameBoard());
      game.startGame();
      updateMainScreen();
    }
  };

  const updatePlayerBoard = () => {
    let gridContainer = document.querySelector(".grid-container-player");
    let overlay = document.createElement("div");
    overlay.classList.add("player-grid-overlay");
    gridContainer.appendChild(overlay);
    let board = game.getPlayerOne().getGameBoard();
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        if (board.getSpaceAt(row, col).getOccupiedBy() !== null) {
          if (board.getHitSquares()[row].includes(col)) {
            gridSquare.style.backgroundColor = "#fa6a60";
            gridContainer.appendChild(gridSquare);
          } else {
            gridSquare.style.backgroundColor = "#98FB98";
            gridContainer.appendChild(gridSquare);
          }
        } else if (board.getInactiveSquares()[row].includes(col)) {
          gridSquare.style.backgroundColor = "black";
          gridContainer.appendChild(gridSquare);
        } else {
          gridContainer.appendChild(gridSquare);
        }
      }
    }
  };

  const updateComputerBoard = () => {
    let gridContainer = document.querySelector(".grid-container-computer");
    let overlay = document.createElement("div");
    overlay.classList.add("computer-grid-overlay");
    gridContainer.appendChild(overlay);
    let board = game.getPlayerTwo().getGameBoard();
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.classList.add("computer-square");
        gridSquare.dataset.value = "" + row + col;
        if (board.getSpaceAt(row, col).getOccupiedBy() !== null) {
          if (board.getHitSquares()[row].includes(col)) {
            gridSquare.style.backgroundColor = "#fa6a60";
            gridContainer.appendChild(gridSquare);
          } else {
            gridSquare.addEventListener("click", squareClickedListener);
            gridContainer.appendChild(gridSquare);
          }
        } else if (board.getInactiveSquares()[row].includes(col)) {
          gridSquare.style.backgroundColor = "black";
          gridContainer.appendChild(gridSquare);
        } else {
          gridSquare.addEventListener("click", squareClickedListener);
          gridContainer.appendChild(gridSquare);
        }
      }
    }
  };

  const updateMainScreen = () => {
    let playerContainer = document.querySelector(".grid-container-player");
    let computerContainer = document.querySelector(".grid-container-computer");
    while (playerContainer.firstChild) {
      playerContainer.removeChild(playerContainer.firstChild);
    }

    while (computerContainer.firstChild) {
      computerContainer.removeChild(computerContainer.firstChild);
    }
    updatePlayerBoard();
    updateComputerBoard();
    updateShipDisplay();
    if (isGameOver()) {
      gameOverHandler();
    } else {
      if (game.getTurn() === 0) {
        toggleOverlay();
      } else {
        computerTurn();
      }
    }
  };

  const resetShipDisplay = () => {
    let shipDisplayHuman = document.querySelector(".ship-display-human");
    let shipDisplayComputer = document.querySelector(".ship-display-computer");
    let ships = shipList.getShips();
    while (shipDisplayHuman.firstChild) {
      shipDisplayHuman.removeChild(shipDisplayHuman.firstChild);
      shipDisplayComputer.removeChild(shipDisplayComputer.firstChild);
    }
    for (let i = 0; i < ships.length; i++) {
      let ship = ships[i];
      let shipSize = ship.getSize();
      let humanShipContainer = document.createElement("div");
      let computerShipContainer = document.createElement("div");
      humanShipContainer.classList.add("ship-container");
      computerShipContainer.classList.add("ship-container");
      for (let j = 0; j < shipSize; j++) {
        let humanShipHealth = document.createElement("div");
        let computerShipHealth = document.createElement("div");
        humanShipHealth.classList.add("ship-health");
        computerShipHealth.classList.add("ship-health");
        humanShipContainer.appendChild(humanShipHealth);
        computerShipContainer.appendChild(computerShipHealth);
      }
      shipDisplayHuman.appendChild(humanShipContainer);
      shipDisplayComputer.appendChild(computerShipContainer);
    }
  };

  const updateShipDisplay = () => {
    let shipDisplayHuman = document.querySelector(".ship-display-human");
    let shipDisplayComputer = document.querySelector(".ship-display-computer");
    let humanShips = game.getPlayerOne().getGameBoard().getShipList();
    let computerShips = game.getPlayerTwo().getGameBoard().getShipList();
    if (game.getPhase() === "live") {
      if (game.getTurn() === 0) {
        while (shipDisplayHuman.firstChild) {
          shipDisplayHuman.removeChild(shipDisplayHuman.firstChild);
        }
        for (let i = 0; i < humanShips.length; i++) {
          let ship = humanShips[i];
          let shipSize = ship.getSize();
          let shipContainer = document.createElement("div");
          shipContainer.classList.add("ship-container");
          if (ship.isSunk()) {
            for (let j = 0; j < shipSize; j++) {
              let shipHealth = document.createElement("div");
              shipHealth.classList.add("ship-health", "sunk");
              shipContainer.appendChild(shipHealth);
            }
          } else {
            for (let j = 0; j < shipSize; j++) {
              let shipHealth = document.createElement("div");
              shipHealth.classList.add("ship-health");
              shipContainer.appendChild(shipHealth);
            }
          }
          shipDisplayHuman.appendChild(shipContainer);
        }
      } else {
        while (shipDisplayComputer.firstChild) {
          shipDisplayComputer.removeChild(shipDisplayComputer.firstChild);
        }
        for (let i = 0; i < computerShips.length; i++) {
          let ship = computerShips[i];
          let shipSize = ship.getSize();
          let shipContainer = document.createElement("div");
          shipContainer.classList.add("ship-container");
          if (ship.isSunk()) {
            for (let j = 0; j < shipSize; j++) {
              let shipHealth = document.createElement("div");
              shipHealth.classList.add("ship-health", "sunk");
              shipContainer.appendChild(shipHealth);
            }
          } else {
            for (let j = 0; j < shipSize; j++) {
              let shipHealth = document.createElement("div");
              shipHealth.classList.add("ship-health");
              shipContainer.appendChild(shipHealth);
            }
          }
          shipDisplayComputer.appendChild(shipContainer);
        }
      }
    }
  };

  const toggleOverlay = () => {
    let playerOverlay = document.querySelector(".player-grid-overlay");
    let computerOverlay = document.querySelector(".computer-grid-overlay");
    if (game.getPhase() === "live") {
      if (game.getTurn() === 0) {
        playerOverlay.style.display = "block";
        computerOverlay.style.display = "none";
      } else {
        playerOverlay.style.display = "none";
        computerOverlay.style.display = "block";
      }
    } else {
      playerOverlay.style.display = "none";
      computerOverlay.style.display = "none";
    }
  };

  const computerTurn = () => {
    toggleOverlay();
    setTimeout(() => {
      game.getPlayerOne().getGameBoard().randomPlay();
      game.switchTurn();
      updateMainScreen();
    }, 8); //00);
  };
  const isGameOver = () => {
    if (
      game.getPlayerOne().getGameBoard().isGameOver() ||
      game.getPlayerTwo().getGameBoard().isGameOver()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const gameOverPopup = (winner) => {
    let popup = document.querySelector("#popup");
    let overlay = document.querySelector("#overlay");
    let message = document.querySelector(".game-result");
    message.textContent = `${winner} won!`;
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    popup.classList.add("visible");
  };

  const gameOverHandler = () => {
    if (game.getPlayerOne().getGameBoard().isGameOver()) {
      gameOverPopup("The CPU");
    } else if (game.getPlayerTwo().getGameBoard().isGameOver()) {
      gameOverPopup("You");
    }
  };

  function squareClickedListener(e) {
    const location = e.target.dataset.value;
    const row = location.charAt(0);
    const col = location.charAt(1);

    if (game.getTurn() === 0) {
      let board = game.getPlayerTwo().getGameBoard();
      board.receiveAttack(row, col);
      game.switchTurn();
      updateMainScreen();
    } else {
      let board = game.getPlayerTwo().getGameBoard();
      board.receiveAttack(row, col);
      game.switchTurn();
      updateMainScreen();
    }
  }


  playAgainBtn.addEventListener("click", playAgainListener);
  rotateBtn.addEventListener("click", rotateShipListener);

  return {
    loadGame,
    updateMainScreen,
  };
}

const addPlayersButton = document.querySelector("#addPlayersButton");
const createPlayersDialog = document.querySelector("#createPlayersDialog");
const cancelButton = createPlayersDialog.querySelector("#cancel");
const createPlayersForm = document.querySelector("#createPlayersForm");

addPlayersButton.addEventListener("click", () => {
  createPlayersDialog.showModal();
});

cancelButton.addEventListener("click", () => {
  createPlayersDialog.close();
});

createPlayersForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const playerOneName = createPlayersForm.querySelector("#playerOneName").value;
  const playerTwoName = createPlayersForm.querySelector("#playerTwoName").value;

  const playerOneSign = createPlayersForm.querySelector(
    "input[name='playerOneSign']:checked"
  )?.value;
  const playerTwoSign = createPlayersForm.querySelector(
    "input[name='playerTwoSign']:checked"
  )?.value;

  if (!playerOneSign || !playerTwoSign) {
    alert("Both of the players need to choose a sign!");
    return;
  }

  const players = [
    { name: playerOneName, sign: playerOneSign },
    { name: playerTwoName, sign: playerTwoSign },
  ];

  handleGame(players);

  createPlayersForm.reset();
  createPlayersDialog.close();
});

function handleGame(playersArray) {
  let gameboard = [];

  const main = document.querySelector("main");
  main.classList.add("flex");

  let board = document.createElement("div");
  //   board.style.width = "300px";
  //   board.style.height = "300px";

  main.appendChild(board);

  let playerToMove = playersArray[0];
  function makeMove() {
    if (playerToMove === playersArray[0]) {
      //sth
      playerToMove = playersArray[1];
    } else {
      //sth
      playerToMove = playersArray[0];
    }
  }
  return { gameboard };
}

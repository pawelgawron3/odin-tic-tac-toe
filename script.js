let draws = 0;
let gameState = {
  gameOver: false,
  gameboard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

const addPlayersButton = document.querySelector("#addPlayersButton");
const createPlayersDialog = document.querySelector("#createPlayersDialog");
const cancelButton = createPlayersDialog.querySelector("#cancel");
const createPlayersForm = document.querySelector("#createPlayersForm");

const playAgainButton = document.querySelector("#playAgainButton");

playAgainButton.addEventListener("click", () => {
  const board = document.querySelector("#board");
  const squares = Array.from(board.querySelectorAll("div"));

  gameState.gameOver = false;

  squares.forEach((el) => {
    el.textContent = "";
  });

  gameState.gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
});

addPlayersButton.addEventListener("click", () => {
  createPlayersDialog.showModal();
});

cancelButton.addEventListener("click", () => {
  createPlayersDialog.close();
});

createPlayersForm.addEventListener("submit", (e) => {
  e.preventDefault();

  playAgainButton.click();

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
    { name: playerOneName, sign: playerOneSign, result: 0 },
    { name: playerTwoName, sign: playerTwoSign, result: 0 },
  ];

  handleGame(players);

  createPlayersForm.reset();
  createPlayersDialog.close();
});

function handleGame(playersArray) {
  let playerToMove = playersArray[0];

  const main = document.querySelector("main");

  const existingBoard = document.querySelector("#board");
  if (existingBoard) existingBoard.remove();

  let board = document.createElement("div");
  board.id = "board";

  for (let i = 0; i < 9; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;

    let square = document.createElement("div");
    square.classList.add("square");

    square.addEventListener("click", () => {
      if (gameState.gameOver) return;
      makeMove(square, row, col);

      let winningSign = checkWinner(gameState.gameboard);
      let winningPlayer = playersArray.find((player) => {
        return player.sign === winningSign;
      });

      if (winningPlayer) {
        gameState.gameOver = true;
        winningPlayer.result++;
        displayScore();
        alert(`${winningPlayer.name} has won the game!`);
      } else if (isBoardFull(gameState.gameboard)) {
        gameState.gameOver = true;
        draws++;
        displayScore();
        alert("It's a draw!");
      }
    });

    board.appendChild(square);
  }

  main.appendChild(board);

  function makeMove(boardElement, row, col) {
    if (boardElement.textContent === "") {
      boardElement.textContent = playerToMove.sign;
      gameState.gameboard[row][col] = playerToMove.sign;

      playerToMove =
        playerToMove === playersArray[0] ? playersArray[1] : playersArray[0];
    }
  }

  function checkWinner(board) {
    const winningCombos = [
      //Wiersze
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],

      //Kolumny
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],

      //Przekątne
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let combo of winningCombos) {
      let [a, b, c] = combo; //destrukturyzacja

      let valA = board[a[0]][a[1]];
      let valB = board[b[0]][b[1]];
      let valC = board[c[0]][c[1]];

      if (valA && valA === valB && valA === valC) {
        return valA;
      }
    }
  }

  function displayScore() {
    const resultsDiv = document.querySelector("#resultsDiv");
    const player1result = resultsDiv.querySelector("#player1result");
    const player2result = resultsDiv.querySelector("#player2result");
    const drawsCounter = resultsDiv.querySelector("#drawsCounter");

    player1result.textContent = "" + playersArray[0].result;
    player2result.textContent = "" + playersArray[1].result;
    drawsCounter.textContent = "" + draws;

    resultsDiv.style.display = "flex";
  }

  function isBoardFull(board) {
    return board.every((row) => row.every((cell) => cell !== ""));
  }
}

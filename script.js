const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const congrats = document.getElementById('congrats');
const winnerName = document.getElementById('winnerName');

let currentPlayer = 'X';
let isGameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleCellClick(e) {
  const cell = e.target;

  if (cell.classList.contains('taken') || !isGameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    showCongrats(currentPlayer);
  } else if (isTie()) {
    statusText.textContent = "It's a tie!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => cells[index].textContent === player);
  });
}

function isTie() {
  return [...cells].every(cell => cell.textContent !== '');
}

function showCongrats(player) {
  winnerName.textContent = `Player ${player}`;
  congrats.style.display = "block";
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = "Player X's turn";
  congrats.style.display = "none";
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

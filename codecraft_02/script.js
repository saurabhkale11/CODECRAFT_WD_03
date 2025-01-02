const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return gameState.includes(null) ? null : 'Draw';
}

function updateStatus(result) {
    if (result === 'Draw') {
        statusText.textContent = "It's a draw!";
    } else if (result) {
        statusText.textContent = `Player ${result} wins!`;
        isGameActive = false;
    } else {
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (!gameState[index] && isGameActive) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            updateStatus(winner);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus(null);
        }
    }
}

function restartGame() {
    gameState.fill(null);
    isGameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player X's Turn`;
    cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
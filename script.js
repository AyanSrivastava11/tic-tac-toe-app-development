let currentPlayer = 'X';
let winner = null;
const cells = Array.from(document.querySelectorAll('.cell'));

function cellClicked(row, col) {
    const cellIndex = row * 3 + col;
    const cell = cells[cellIndex];
    
    if (!winner && !cell.textContent) {
        cell.textContent = currentPlayer;
        cell.classList.add('clicked'); // Add clicked class
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            winner = cells[a].textContent;
            displayWinner();
            return;
        }
    }

    if (!cells.some(cell => cell.textContent === '')) {
        winner = 'draw';
        displayWinner();
    }
}

function displayWinner() {
    const messageElement = document.getElementById('message');
    if (winner === 'draw') {
        messageElement.textContent = "It's a draw!";
    } else {
        messageElement.textContent = `Player ${winner} wins!`;
    }
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
        cell.classList.remove('clicked'); // Remove clicked class
    });
    winner = null;
    currentPlayer = 'X';
    document.getElementById('message').textContent = '';
}

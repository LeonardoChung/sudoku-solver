document.addEventListener('DOMContentLoaded', function () {
    const solveButton = document.getElementById('solve');
    const resetButton = document.getElementById('reset');
    const msgElement = document.getElementById('msg');

    solveButton.addEventListener('click', function () {
        const sudokuInputs = Array.from(document.querySelectorAll('#matriz input')).map(input => parseInt(input.value) || '');

    


        if (isValidSudoku(sudokuInputs)) {
            const solvedSudoku = solveSudoku(sudokuInputs);

            if (solvedSudoku) {
                for (let i = 0; i < 81; i++) {
                    document.getElementById(i + 1).value = solvedSudoku[i];
                }
                msgElement.textContent = 'Sudoku solved successfully!';
            } else {
                msgElement.textContent = 'Unable to solve Sudoku. Check your input.';
            }
        } else {
            msgElement.textContent = 'Invalid Sudoku. Check your input.';
        }
    });

    resetButton.addEventListener('click', function () {
        document.querySelectorAll('#matriz input').forEach(input => input.value = '');
        msgElement.textContent = '';
    });
});

function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);

    if (!emptyCell) {
        return board;
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
            board[row * 9 + col] = num;

            if (solveSudoku(board)) {
                return board;
            }

            board[row * 9 + col] = '';
        }
    }

    return null;
}

function isValidMove(board, row, col, num) {
    return (
        !usedInRow(board, row, num) &&
        !usedInColumn(board, col, num) &&
        !usedInGrid(board, row - (row % 3), col - (col % 3), num)
    );
}

function usedInRow(board, row, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row * 9 + i] === num) {
            return true;
        }
    }
    return false;
}

function usedInColumn(board, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i * 9 + col] === num) {
            return true;
        }
    }
    return false;
}

function usedInGrid(board, startRow, startCol, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[(startRow + i) * 9 + (startCol + j)] === num) {
                return true;
            }
        }
    }
    return false;
}

function findEmptyCell(board) {
    for (let i = 0; i < 81; i++) {
        if (board[i] === '') {
            return [Math.floor(i / 9), i % 9];
        }
    }
    return null;
}

function isValidSudoku(board) {
    const set = new Set();

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = board[i * 9 + j];
            const boxNum = 3 * Math.floor(i / 3) + Math.floor(j / 3);
            const row = `row: ${i}, value ${cell}`;
            const col = `col: ${j}, value ${cell}`;
            const box = `box: ${boxNum}, value ${cell}`;

            
            if (cell !== '' && (set.has(row) || set.has(col) || set.has(box))) {
                return false;
            }

            set.add(row);
            set.add(col);
            set.add(box);
        }
    }

    return true;
}

function limitInputLength(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}
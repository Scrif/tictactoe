'use strict';

const player = (symbol) => {
    this.symbol = symbol;

    const getSymbol = () => {
        return symbol;
    };

    return { getSymbol };
};

const gameBoard = (() => {
    let board = new Array(9);
    console.log(board);

    const setPosition = (index, symbol) => {
        if (index > board.length) return;
        board[index] = symbol;
    };

    const getPosition = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setPosition, getPosition, reset }
})();

const boardDisplay = (() => {
    const positionBoxes = document.querySelectorAll('.tile');
    const messageField = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');

    positionBoxes.forEach((position) => {
        position.addEventListener("click", (e) => {
            if (game.getStatus() || e.target.textContent !== "") return;
            game.playRound(parseInt(e.target.dataset.index));
            updateGame();
        })
    });

    resetButton.addEventListener('click', (e) => {
        gameBoard.reset();
        game.reset();
        updateGame();
        setMessage("Player 1's turn!");
    });

    const updateGame = () => {
        for (let i = 0; i < positionBoxes.length; i++) {
            positionBoxes[i].textContent = gameBoard.getPosition(i);
        }
    };

    const displayResult = (winner) => {
        if (winner === "Draw") {
            setMessage("Draw!");
        } else {
            setMessage(`Player {$winner} has won!`);
        }
    };

    const setMessage = (message) => {
        messageField.textContent = message;
    };

    return { displayResult, setMessage };
})();

const game = (() => {
    const player1 = Player("1");
    const player2 = Player("2");
    let round = 1;
    let status = false;

    const playRound = (positionIndex) => {
        gameBoard.setPosition(positionIndex, getCurrentPlayer());
        if (checkWinner(positionIndex)) {
            boardDisplay.displayResult(getCurrentPlayer());
            isOver = true;
            return;
        }
        if (round === 9) {
            boardDisplay.displayResult("Draw");
            status = true;
            return;
        }
        round++;
        boardDisplay.setMessage(
            `Player ${getCurrentPlayer()}'s turn`
        );
    };

    const getCurrentPlayer = () => {
        return round % 2 === 1 ? player1.getSymbol() : player2.getSymbol();
    };

    const checkWinner = (positionIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions
        .filter((set) => set.includes(positionIndex))
        .some((combination) => 
        combination.every(
            (index) => gameBoard.getPosition(index) === getCurrentPlayer()
        ));
    };

    const getStatus = () => {
        return status;
    };

    const reset = () => {
        round = 1;
        status = false;
    };

    return { playRound, getStatus, reset };
})();
'use strict';

const gameBoard = (() => {
    let board = new Array(9);

    const setPosition = (location, symbol) => {
        if (location > board.length) return;
        board[location] = symbol;
    };

    const getPosition = (location) => {
        if (location > board.length) return;
        return board[location];
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setPosition, getPosition, reset }
})();

const player = (symbol) => {
    this.symbol = symbol;

    const getSymbol = () => {
        return symbol;
    };

    return { getSymbol };
};

const boardDisplay = (() => {
    const positionBoxes = document.querySelectorAll('.position');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');

    positionBoxes.forEach((position) => {
        if (game.getStatus() || e.target.textContent !== "") return;
        game.playRound(parseInt(e.target.dataset.location));
        updateGame();
    });

    resetButton.addEventListener('click', (e) => {
        gameBoard.reset();
        game.reset();
        updateGame();
        setMessage("Player 1's turn!");
    });

    const updateGame = () => {
        for (let i = 0; i < positionBoxes.length; i++) {
            positionBoxes[i].textContent = gameBoard.getField(i);
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
        messageElement.textContent = message;
    };

    return { displayResult, setMessage };
})();

const game = (() => {
    const player1 = Player("1");
    const player2 = Player("2");
    let round = 1;
    let isOver = false;

    const playRound = (positionIndex) => {
        gameBoard.setPosition(positionIndex, getCurrentPlayer());
        if (checkWinner(positionIndex)) {
            boardDisplay.displayResult(getCurrentPlayer());
            isOver = true;
            return;
        }
        if (round === 9) {
            boardDisplay.displayResult("Draw");
            isOver = true;
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
            (location) => gameBoard.getPosition(location) === getCurrentPlayer()
        ));
    };

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    return { playRound, getIsOver, reset };
})();
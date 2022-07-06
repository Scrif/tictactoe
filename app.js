'use strict';

const gameBoard = (() => {
    let board = new Array(9);

    const setField = (location, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    }
})();

const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return { getSign };
};


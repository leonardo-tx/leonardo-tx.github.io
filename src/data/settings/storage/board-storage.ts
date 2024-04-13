import { BOARD_LENGTH } from "@/core/sudoku-app/constants/sudoku-constants";
import { DetailedSudoku, SimpleSudoku } from "@/core/sudoku-app/models/sudoku-models";
import * as settingsStorage from "./settings-storage";

const key = "sudokuBoard";

export function getBoard(): DetailedSudoku | null {
    const textBoard = settingsStorage.getSettingsValue(key); 
    if (textBoard === null || typeof textBoard !== "string") return null;

    const board: DetailedSudoku = Array.from({length: BOARD_LENGTH}, () => new Array(9))

    for (let i = 0, j = 0; i < textBoard.length; i++, j++) {
        const y = Math.floor(j / 9)
        const x = j % 9;

        const number = parseInt(textBoard[i]);
        if (isNaN(number)) return null;
        if (textBoard[i + 1] !== "!") {
            board[y][x] = { number, mutable: false };
            continue;
        }
        board[y][x] = { number, mutable: true };
        i++; continue;
    }
    return board;
}

export function saveNewBoard(board: SimpleSudoku): void {
    let text = "";

    for (let y = 0; y < BOARD_LENGTH; y++) {
        for (let x = 0; x < BOARD_LENGTH; x++) {
            text += `${board[y][x]}${board[y][x] === 0 ? "!" : ""}`
        }
    }
    settingsStorage.setSettingsValue(key, text);
}

export function saveBoard(board: DetailedSudoku): void {
    let text = "";

    for (let y = 0; y < BOARD_LENGTH; y++) {
        for (let x = 0; x < BOARD_LENGTH; x++) {
            text += `${board[y][x].number}${board[y][x].mutable ? "!" : ""}`
        }
    }
    settingsStorage.setSettingsValue(key, text);
}

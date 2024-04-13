import { Difficulty, createChallenge } from "@/core/sudoku-app/sudoku/sudoku";
import { createEmptyBoard, fillBoard } from "@/core/sudoku-app/sudoku/sudoku-generator";

self.onmessage = (e: MessageEvent<Difficulty>) => {
    const board = createEmptyBoard();
    fillBoard(board);
    createChallenge(board, e.data);
    
    self.postMessage(board);
};

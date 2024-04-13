import { atom } from "jotai";
import { DetailedSudoku, SimpleSudoku } from "@/core/sudoku-app/models/sudoku-models";
import { createEmptyBoard } from "@/core/sudoku-app/sudoku/sudoku-generator";
import { parseDetailedSudoku } from "@/core/sudoku-app/sudoku/sudoku-utils";

const sudokuAtom = atom<{challenge: DetailedSudoku, complete: SimpleSudoku}>({challenge: parseDetailedSudoku(createEmptyBoard()), complete: createEmptyBoard()});

export default sudokuAtom;

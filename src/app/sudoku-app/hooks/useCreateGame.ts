import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SimpleSudoku } from "@/core/sudoku-app/models/sudoku-models";
import { parseDetailedSudoku } from "@/core/sudoku-app/sudoku/sudoku-utils";
import { saveNewBoard } from "@/data/settings/storage/board-storage";
import { Difficulty } from "@/core/sudoku-app/sudoku/sudoku";
import { useSetAtom } from "jotai";
import sudokuAtom from "../atoms/sudokuAtom";
import { fillAllCells } from "@/core/sudoku-app/sudoku/sudoku-generator";

let worker: Worker;

export default function useCreateGame(): {
    loading: boolean;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    createBoard: (difficulty: Difficulty) => void;
} {
    const [loading, setLoading] = useState(false);
    const setSudoku = useSetAtom(sudokuAtom);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        worker = new Worker(new URL('../workers/sudokuWorker.ts', import.meta.url), { type: "module" });
        worker.onmessage = (event: MessageEvent<SimpleSudoku>) => {
            saveNewBoard(event.data);
            
            const board = parseDetailedSudoku(event.data);
            const completeBoard = event.data.map((row) => [...row]);
            
            fillAllCells(completeBoard, 0, 0);

            setSudoku({ challenge: board, complete: completeBoard });
            setLoading(false);
        }

        return () => worker.terminate();
    }, [setSudoku]);

    const createBoard = (difficulty: Difficulty): void => {
        setLoading(true);
        worker.postMessage(difficulty);
        onClose();
    }

    return { loading, isOpen, onOpen, onClose, createBoard };
}

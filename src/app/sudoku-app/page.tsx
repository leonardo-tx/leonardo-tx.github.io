"use client";

import { JSX, useEffect } from "react";
import * as boardStorage from "@/data/settings/storage/board-storage";
import Board from "./components/Board";
import { useDisclosure } from "@chakra-ui/react";
import { getOriginalChallenge, isEmpty, parseDetailedSudoku } from "@/core/sudoku-app/sudoku/sudoku-utils";
import CreateGame from "./components/CreateGame";
import GameActions from "./components/GameActions";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import sudokuAtom from "./atoms/sudokuAtom";
import WinModal from "./components/WinModal";
import finishedAtom from "./atoms/finishedAtom";
import currentAtom from "./atoms/currentAtom";
import styled from "@emotion/styled";
import { createEmptyBoard, fillAllCells } from "@/core/sudoku-app/sudoku/sudoku-generator";
import { challengeIsValid } from "@/core/sudoku-app/sudoku/sudoku-solver";

export default function Home(): JSX.Element {
    const [sudoku, setSudoku] = useAtom(sudokuAtom);
    const finished = useAtomValue(finishedAtom);
    const setCurrent = useSetAtom(currentAtom);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const board = boardStorage.getBoard();
        if (board === null) {
            const emptyBoard = createEmptyBoard();
            setSudoku({ challenge: parseDetailedSudoku(emptyBoard), complete: emptyBoard });
            return;
        }

        const challengeBoard = getOriginalChallenge(board);
        if (!challengeIsValid(challengeBoard)) {
            const emptyBoard = createEmptyBoard();
            setSudoku({ challenge: parseDetailedSudoku(emptyBoard), complete: emptyBoard });
            return;
        }

        fillAllCells(challengeBoard, 0, 0);
        setSudoku({ challenge: board, complete: challengeBoard });
    }, [setSudoku])
    
    useEffect(() => {
        if (isEmpty(sudoku.challenge)) return;
        boardStorage.saveBoard(sudoku.challenge);
    }, [sudoku.challenge]);

    useEffect(() => {
        if (!finished) return;

        setCurrent(-1);
        onOpen();
    }, [finished, onOpen, setCurrent])

    return(
        <GameContainer>
            <Board />
            <ActionContainer>
                {finished || isEmpty(sudoku.challenge) ? <CreateGame /> : <GameActions />}
            </ActionContainer>
            <WinModal isOpen={isOpen} onClose={onClose} />
        </GameContainer>
    );
}

const GameContainer = styled.section`
    display: grid;
    grid-template-columns: 1fr clamp(0px, min(100%, 80vh), 600px) 1fr;
    grid-template-areas:
        "game-left board game-right"
    ;
    position: relative;
    width: 100%;
    gap: 2em;

    @media only screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: center;
    }
`;

const ActionContainer = styled.section`
    grid-area: game-right;
    display: flex;
    align-items: center;
`;

import { Grid } from "@chakra-ui/react";
import { JSX, useMemo } from "react";
import { BOARD_LENGTH } from "@/core/sudoku-app/constants/sudoku-constants";
import Cell from "./Cell";
import Divisors from "./Divisors";
import styled from "@emotion/styled";

export default function Board(): JSX.Element {
    const cellElements: JSX.Element[] = useMemo(() => {
        const elements: JSX.Element[] = [];

        for (let y = BOARD_LENGTH - 1; y >= 0; y--) {
            for (let x = 0; x < BOARD_LENGTH; x++) {
                elements.push(<Cell key={y * BOARD_LENGTH + x} coords={[x, y]} />);
            }
        }
        return elements;
    }, []);
    
    return (
        <GridBoard
            aria-label="Tabuleiro Sudoku"
            templateColumns={`repeat(${BOARD_LENGTH}, 1fr)`} 
            templateRows={`repeat(${BOARD_LENGTH}, 1fr)`} 
            gap="3px"
        >
            {cellElements}
            <Divisors />
        </GridBoard>
    );
}

const GridBoard = styled(Grid)`
    grid-area: board;
    width: clamp(0px, min(100%, 80vh), 600px);
    position: relative;
    aspect-ratio: 1 / 1;
`;

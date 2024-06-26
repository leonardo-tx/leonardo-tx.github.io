import { JSX, memo } from "react";
import { BOARD_LENGTH } from "@/core/sudoku-app/constants/sudoku-constants";
import { Grid, GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Divisors = memo((): JSX.Element => {
    return (
        <>
            <Grid
                pointerEvents="none"
                h="100%"
                w="100%"
                position="absolute"
                templateColumns={`repeat(${BOARD_LENGTH - 1}, 1fr 3px) 1fr`} 
            >
                {Array.from({ length: BOARD_LENGTH - 1 }, (_, i) => i).map((i) => (
                    <BoardDivisor key={i} gridColumn={(i + 1) * 2} $direction="vertical" $divisor={(i + 1) % 3 === 0 ? "matrix" : "cell"} />
                ))}
            </Grid>
            <Grid
                pointerEvents="none"
                h="100%"
                w="100%"
                position="absolute"
                templateRows={`repeat(${BOARD_LENGTH - 1}, 1fr 3px) 1fr`} 
            >
                {Array.from({ length: BOARD_LENGTH - 1 }, (_, i) => i).map((i) => (
                    <BoardDivisor key={i} gridRow={(i + 1) * 2} $direction="horizontal" $divisor={(i + 1) % 3 === 0 ? "matrix" : "cell"} />
                ))}
            </Grid>
        </>
        
    );
});

const BoardDivisor = styled(GridItem, { shouldForwardProp: (propName) => propName !== 'theme' && !propName.startsWith("$")})<{
    $direction: "horizontal" | "vertical";
    $divisor: "cell" | "matrix"
}>`
    width: ${props => props.$direction === "horizontal" ? "100%" : "3px" };
    height: ${props => props.$direction === "vertical" ? "100%" : "3px" };
    position: absolute;
    border-radius: 8px;
    background-color: ${props => props.$divisor === "cell" ? "#555555" : "#7266F5"};
    z-index: ${props => props.$divisor === "cell" ? 2 : 3};
`;

Divisors.displayName = "Divisors";

export default Divisors;

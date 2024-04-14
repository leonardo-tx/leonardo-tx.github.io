import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { JSX } from "react";
import sortSettingsAtom from "../atoms/sortSettingsAtom";

export default function ElementsView(): JSX.Element {
    const sortSettings = useAtomValue(sortSettingsAtom);
    const percentage = 100 / sortSettings.elements.length;
    const viewElements: JSX.Element[] = [];

    for (let i = 0; i < 1000; i++) {
        const element = sortSettings.elements[i];
        const getBackgroundColor = () => {
            if (i === sortSettings.swapIndex) 
                return "#ffaaaa, #ff9999";
            if (sortSettings.sortedIndex && 
                i <= sortSettings.sortedIndex && 
                i >= sortSettings.sortedIndex - sortSettings.elements.length / 10) return "#99cc99, #99cc99";
            return "#9970aa, #cc90cc";
        };
        viewElements.push(
            <Element
                key={i}
                style={{ 
                    height: `${percentage * element}%`, 
                    background: `linear-gradient(to left, ${getBackgroundColor()})`
                }} 
                $outOfRange={i >= sortSettings.elements.length}
            />
        );
    }

    return (
        <Container>
            {viewElements} 
        </Container> 
    ); 
}

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 100%;
`;

const Element = styled("div", { shouldForwardProp: (propName) => propName !== 'theme' && !propName.startsWith("$")})<{
    $outOfRange: boolean;
}>`
    ${(props) => props.$outOfRange && "display: none;"}
    flex: 1;
`;

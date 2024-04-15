import styled from "@emotion/styled";
import { useAtomValue } from "jotai";
import { JSX } from "react";
import sortSettingsAtom from "../atoms/sortSettingsAtom";

export default function ElementsView(): JSX.Element {
    const { elements, sortedIndex, swapIndex } = useAtomValue(sortSettingsAtom);
    const percentage = 100 / elements.length;
    const viewElements: JSX.Element[] = [];

    for (let i = 0; i < elements.length; i++) {
        viewElements.push(
            <Element
                key={i}
                style={{ 
                    height: `${percentage * elements[i]}%`, 
                    background: `linear-gradient(to left, ${getBackgroundColor(i, swapIndex, sortedIndex, elements.length)})`
                }}
            />
        );
    }

    return (
        <Container>
            {viewElements} 
        </Container> 
    ); 
}

const getBackgroundColor = (i: number, swapIndex: number | null, sortedIndex: number | null, length: number) => {
    if (i === swapIndex) 
        return "#ffaaaa, #ff9999";
    if (sortedIndex && i <= sortedIndex && i >= sortedIndex - length / 10) 
        return "#99cc99, #99cc99";
    return "#9970aa, #cc90cc";
};


const Container = styled.div`
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 100%;
`;

const Element = styled.div`
    flex: 1;
`;

import styled from "@emotion/styled";
import { useAtomValue, useSetAtom } from "jotai";
import { JSX, useEffect, useRef } from "react";
import sortSettingsAtom from "../atoms/sortSettingsAtom";
import elementsAtom from "../atoms/elementsAtom";

const Element = styled.div`
    flex: 1;
    background: linear-gradient(to top, #53337c, #c096f7);
`;

const viewElements: JSX.Element[] = [];

for (let i = 0; i < 1000; i++) {
    viewElements.push(<Element key={i} />);
}

export default function ElementsView(): JSX.Element {
    const { length } = useAtomValue(sortSettingsAtom);

    const setElements = useSetAtom(elementsAtom);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setElements(containerRef);
    }, [setElements]);

    useEffect(() => {
        if (containerRef.current === null) return;

        const percentage = 100 / length;
        for (let i = 0; i < 1000; i++) {
            const child = containerRef.current.children[i] as HTMLDivElement;
            child.style.background = "";
            if (i < length) {
                child.style.height = `${percentage * (i + 1)}%`;
                child.style.display = ""; 
                continue;
            }
            child.style.height = "";
            child.style.display = "none";
        }
    }, []); 

    return (
        <Container ref={containerRef}>
            {viewElements} 
        </Container> 
    ); 
}

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    height: 100%;
    width: 100%;
    min-height: 300px;
`;

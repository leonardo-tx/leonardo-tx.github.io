import styled from "@emotion/styled";
import { useAtomValue, useSetAtom } from "jotai";
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import sortSettingsAtom from "../atoms/sortSettingsAtom";

const Element = styled.div`
    flex: 1;
    background: linear-gradient(to top, #53337c, #c096f7);
`;

const changeBackground = "linear-gradient(to top, #ffaaaa, #ff9999)";
const sortedBackground = "linear-gradient(to top, #99cc99, #99cc99)";

const viewElements: JSX.Element[] = [];

for (let i = 0; i < 1000; i++) {
    viewElements.push(<Element key={i} />);
}

export default function ElementsView(): JSX.Element {
    const { elements, sorted, swapIndexes, sortType, replace } = useAtomValue(sortSettingsAtom);
    const setSortSettings = useSetAtom(sortSettingsAtom);
    const containerRef = useRef<HTMLDivElement>(null);
    const [lastSwapIndex, setLastSwapIndex] = useState<number | null>(null);
    const [lastReplaceIndex, setLastReplaceIndex] = useState<number | null>(null);

    const time = useMemo(() => 4000 / elements.length, [elements.length]);
    const sortedLength = useMemo(() => elements.length / 10, [elements.length]);
    
    useEffect(() => {
        if (containerRef.current === null) return;

        const percentage = 100 / elements.length;
        for (let i = 0; i < 1000; i++) {
            const child = containerRef.current.children[i] as HTMLDivElement;
            if (i < elements.length) {
                child.style.height = `${percentage * elements[i]}%`;
                child.style.display = "";
                child.style.background = "";
                continue;
            }
            child.style.height = "";
            child.style.display = "none";
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elements.length, sortType]);

    useEffect(() => {
        if (containerRef.current === null) return;
        if (lastSwapIndex !== null) {
            const child = containerRef.current.children[lastSwapIndex] as HTMLDivElement;
            child.style.background = "";
        }
        if (swapIndexes === null) return;
        
        const child1 = containerRef.current.children[swapIndexes[0]] as HTMLDivElement;
        if (swapIndexes.length === 1) {
            child1.style.background = changeBackground;
            return;
        }
        child1.style.background = "";
        const child2 = containerRef.current.children[swapIndexes[1]] as HTMLDivElement;
        const temp = child1.style.height;

        child1.style.height = child2.style.height;
        child2.style.height = temp;
        child2.style.background = changeBackground;
        setLastSwapIndex(swapIndexes[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [swapIndexes]);

    useEffect(() => {
        if (containerRef.current === null) return;
        if (lastReplaceIndex !== null) {
            const child = containerRef.current.children[lastReplaceIndex] as HTMLDivElement;
            child.style.background = "";
        }
        if (replace === null) return;

        const percentage = 100 / elements.length;
        const child = containerRef.current.children[replace.index] as HTMLDivElement;
        child.style.height = `${percentage * replace.value}%`;
        child.style.background = changeBackground;
        setLastReplaceIndex(replace.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [replace])

    useEffect(() => {
        if (!sorted) {
            const child = containerRef.current!.children[elements.length - 1] as HTMLDivElement;
            child.style.background = "";
            return;
        }
        const showSorted = async() => {
            for (let i = -sortedLength; i < elements.length; i++) {
                const childToRemoveBackground = containerRef.current!.children.item(i - 1) as HTMLDivElement;
                if (childToRemoveBackground !== null) {
                    childToRemoveBackground.style.background = ""
                }
                for (let j = i; j < i + sortedLength; j++) {
                    const childToAddBackground = containerRef.current!.children.item(j) as HTMLDivElement;
                    if (childToAddBackground !== null) {
                        childToAddBackground.style.background = sortedBackground;
                    }
                }
                await waitRender(time / 2);
            }
            setSortSettings((oldSettings) => ({...oldSettings, sorted: false}));
        }
        showSorted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sorted, sortedLength, setSortSettings])

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

async function waitRender(time: number) {
    await new Promise(resolve => setTimeout(resolve, time));
}

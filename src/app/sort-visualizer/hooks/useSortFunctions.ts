import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import sortSettingsAtom from "../atoms/sortSettingsAtom";
import SortType from "@/core/sort-visualizer/SortType";
import Sorter from "@/core/common/Sorter";
import elementsAtom from "../atoms/elementsAtom";

const changeBackground = "linear-gradient(to top, #ffaaaa, #ff9999)";
const sortedBackground = "linear-gradient(to top, #99cc99, #99cc99)";

export default function useSortFunctions() {
    const [sortSettings, setSortSettings] = useAtom(sortSettingsAtom);
    const elements = useAtomValue(elementsAtom);
    const [details, setDetails] = useState({ swap: 0, replace: 0, compare: 0 });
    const isSorting = useRef(false);

    useEffect(() => {
        setSortSettings((oldSettings) => ({
            ...oldSettings,
            length: 100
        }));
    }, [setSortSettings]);
    
    const time = useMemo(() => 4000 / sortSettings.length, [sortSettings.length]);
    
    const onSwap = useCallback(async (first: number, second: number) => {
        if (elements === null || elements.current === null) throw Error();
        const child1 = elements.current.children.item(first) as HTMLDivElement;
        const child2 = elements.current.children.item(second) as HTMLDivElement;

        if (child1 === null || child2 === null || !isSorting.current) throw Error();
        
        child1.style.background = changeBackground;
        await waitRender(time / 2);
        
        if (!isSorting.current) throw Error();

        [child1.style.height, child2.style.height] = [child2.style.height, child1.style.height];
        child1.style.background = "";
        child2.style.background = changeBackground;
        setDetails((oldDetails) => ({...oldDetails, swap: oldDetails.swap + 1}));
        await waitRender(time / 2);
        
        child2.style.background = "";
    }, [time, elements])

    const onReplace = useCallback(async (index: number, value: number) => {
        if (elements === null || elements.current === null) throw Error();
        const child = elements.current.children.item(index) as HTMLDivElement;

        if (child === null || !isSorting.current) throw Error();
        
        child.style.height = `${value}%`;
        child.style.background = changeBackground;
        setDetails((oldDetails) => ({...oldDetails, replace: oldDetails.replace + 1}));
        await waitRender(time);
        
        child.style.background = "";
    }, [time, elements])

    const onGetValue = useCallback((index: number) => {
        if (elements === null || elements.current === null) throw Error();
        const child = elements.current.children.item(index) as HTMLDivElement;

        if (child === null || !isSorting.current) throw Error();
        return parseFloat(child.style.height.slice(0, child.style.height.length - 1));
    }, [elements])

    const onComparation = useCallback((left: number, right: number, count: boolean = true) => {
        if (!count) return left - right;
        
        setDetails((oldDetails) => ({...oldDetails, compare: oldDetails.compare + 1}));
        return left - right;
    }, [setDetails]);

    const onEndSorter = async (sorter: SortType | undefined = undefined) => {
        await waitRender(time / 2); 

        if (!sorter || elements === null || elements.current === null) {
            setSortSettings((oldSettings) => ({...oldSettings, isSorting: false}));
            return;
        }
        for (let i = 0; i < sortSettings.length - 1; i++) {
            if (onComparation(i, i + 1, false) >= 0) {
                setSortSettings((oldSettings) => ({...oldSettings, isSorting: false}));
                return;
            }
        }
        const sortedLength = sortSettings.length / 10;
        for (let i = -sortedLength; i < sortSettings.length; i++) {
            const childToRemoveBackground = elements.current.children.item(i - 1) as HTMLDivElement;
            if (childToRemoveBackground !== null) {
                childToRemoveBackground.style.background = "";
            }
            for (let j = i; j < i + sortedLength; j++) {
                const childToAddBackground = elements.current.children.item(j) as HTMLDivElement;
                if (!isSorting.current) throw Error();
                if (childToAddBackground !== null) {
                    childToAddBackground.style.background = sortedBackground;
                }
            }
            await waitRender(time / 2);
        }
        (elements.current.children[sortSettings.length - 1] as HTMLDivElement).style.background = "";
        setSortSettings((oldSettings) => ({...oldSettings, isSorting: false}));
        isSorting.current = false;
    }

    const randomizeElements = async () => {
        setDetails({ swap: 0, replace: 0, compare: 0 });
        setSortSettings((oldSettings) => ({...oldSettings, isSorting: true}));
        isSorting.current = true;

        for (let i = 0; i < sortSettings.length; i++) {
            const j = Math.floor(Math.random() * sortSettings.length);
            try {
                await onSwap(i, j);
            } catch {
                break;
            }
        }
        await onEndSorter();
    }

    const reverseElements = async () => {
        setDetails({ swap: 0, replace: 0, compare: 0 });
        setSortSettings((oldSettings) => ({...oldSettings, isSorting: true}));
        isSorting.current = true;

        const mid = Math.floor(sortSettings.length / 2);
        for (let i = 0; i < mid; i++) {
            const j = sortSettings.length - 1 - i;
            try {
                await onSwap(i, j);
            } catch {
                break;
            }
        }
        await onEndSorter();
    }

    const sortElements = async () => {
        setDetails({ swap: 0, replace: 0, compare: 0 });
        setSortSettings((oldSettings) => ({...oldSettings, isSorting: true}));
        isSorting.current = true;

        const sorterType = sortSettings.sortType;
        const sorter: Sorter<number> = new Sorter(
            onComparation,
            onSwap,
            onReplace,
            onGetValue
        );

        try {
            await sorter[sorterType](sortSettings.length);
        } catch (e) {
           // Nothing
        }
        try {
            await onEndSorter(sorterType); 
        } catch {
            // Nothing
        }
    }

    const changeSorter = (sorter: SortType) => {
        isSorting.current = false;
        setSortSettings(oldSettings => ({
            ...oldSettings,
            isSorting: false,
            sortType: sorter
        }));
    }

    const changeSize = (length: number) => {
        isSorting.current = false;
        setSortSettings((oldSettings) => ({
            ...oldSettings, 
            isSorting: false,
            length
        }));

    }

    return { sortElements, reverseElements, randomizeElements, changeSorter, changeSize, details, sortSettings };
}

async function waitRender(time: number) {
    await new Promise(resolve => setTimeout(resolve, time));
}

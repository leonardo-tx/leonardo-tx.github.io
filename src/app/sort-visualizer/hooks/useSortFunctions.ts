import { useAtom } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import sortSettingsAtom from "../atoms/sortSettingsAtom";
import SortType from "@/core/sort-visualizer/SortType";
import Sorter from "@/core/common/Sorter";

export default function useSortFunctions() {
    const [sortSettings, setSortSettings] = useAtom(sortSettingsAtom);
    const [details, setDetails] = useState({ swap: 0, replace: 0, read: 0, compare: 0 });

    useEffect(() => {
        setSortSettings((oldSettings) => ({
            ...oldSettings,
            elements: Array.from({ length: 100 }, (_, i) => i + 1)
        }))

        return () => {
            setSortSettings((oldSettings) => ({
                sortType: SortType.BubbleSort, 
                elements: Array.from({ length: oldSettings.elements.length + 1 }, (_, i) => i + 1),
                sorted: false,
                swapIndexes: null,
                replace: null
            }))
        }
    }, [setSortSettings]);
    
    const time = useMemo(() => 4000 / sortSettings.elements.length, [sortSettings.elements.length]);
    
    const onSwap = useCallback(async (first: number, second: number, elements: number[], sorter: SortType) => { 
        [elements[first], elements[second]] = [elements[second], elements[first]];

        setDetails((oldDetails) => ({...oldDetails, swap: oldDetails.swap + 1}));
        setSortSettings((oldSettings) => {
            if (oldSettings.elements.length !== elements.length || sorter !== oldSettings.sortType) throw Error();
            return {...oldSettings, swapIndexes: [first]};
        });
        await waitRender(time / 2)
        setSortSettings((oldSettings) => {
            if (oldSettings.elements.length !== elements.length || sorter !== oldSettings.sortType) throw Error();
            return {...oldSettings, swapIndexes: [first, second], elements: [...elements]};
        });
        await waitRender(time / 2)
    }, [setSortSettings, time])

    const onReplace = useCallback(async (index: number, value: number, elements: number[], sorter: SortType) => {
        elements[index] = value;

        setDetails((oldDetails) => ({...oldDetails, replace: oldDetails.replace + 1}));
        setSortSettings((oldSettings) => {
            if (oldSettings.elements.length !== elements.length || sorter !== oldSettings.sortType) throw Error();
            return {...oldSettings, replace: { index, value }, elements: [...elements]};
        });
        await waitRender(time)
    }, [setSortSettings, time])

    const onGetValue = useCallback((index: number, elements: number[]) => {
        setDetails((oldDetails) => ({...oldDetails, read: oldDetails.read + 1}));
        return elements[index];
    }, [])

    const onComparation = useCallback((left: number, right: number) => {
        setDetails((oldDetails) => ({...oldDetails, compare: oldDetails.compare + 1}));
        return left - right;
    }, [setDetails]);

    const onEndSorter = async (sorter: SortType | undefined = undefined, elements: number[] | undefined = undefined) => {
        await waitRender(time / 2);
        setSortSettings((oldSettings) => ({...oldSettings, swapIndexes: null, replace: null}));

        if (!sorter || !elements) return;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] !== i + 1) return;
        }
        setSortSettings((oldSettings) => ({...oldSettings, sorted: true}));
    }

    const randomizeElements = async () => {
        setDetails({ swap: 0, replace: 0, read: 0, compare: 0 });

        const copy = [...sortSettings.elements];
        const sorter = sortSettings.sortType;

        for (let i = 0; i < copy.length; i++) {
            const j = Math.floor(Math.random() * sortSettings.elements.length);
            try {
                await onSwap(i, j, copy, sorter);
            } catch {
                break;
            }
        }
        await onEndSorter();
    }

    const reverseElements = async () => {
        setDetails({ swap: 0, replace: 0, read: 0, compare: 0 });

        const copy = [...sortSettings.elements];
        const sorter = sortSettings.sortType;
        const mid = Math.floor(copy.length / 2);
        for (let i = 0; i < mid; i++) {
            const j = copy.length - 1 - i;
            try {
                await onSwap(i, j, copy, sorter);
            } catch {
                break;
            }
        }
        await onEndSorter();
    }

    const sortElements = async () => {
        const details = { swap: 0, replace: 0, read: 0, compare: 0 }
        setDetails({...details});

        const copy = [...sortSettings.elements];
        const sorterType = sortSettings.sortType;
        const sorter: Sorter<number> = new Sorter(
            (left, right) => onComparation(left, right),
            (first, second) => onSwap(first, second, copy, sorterType),
            (index, value) => onReplace(index, value, copy, sorterType),
            (index) => onGetValue(index, copy)
        );

        try {
            await sorter[sorterType](copy);
        } catch (e) {
           // Nothing 
        }
        try {
            await onEndSorter(sorterType, copy); 
        } catch {
            // Nothing
        }
    }

    const changeSorter = (sorter: SortType) => {
        setSortSettings(oldSettings => ({
            ...oldSettings,
            swapIndex: null,
            sortedIndex: null,
            sortType: sorter, 
            elements: Array.from({ length: oldSettings.elements.length }, (_, i) => i + 1)
        }));
    }

    const changeSize = (length: number) => {
        setSortSettings((oldSettings) => ({
            ...oldSettings, 
            sortedIndex: null, 
            swapIndex: null, 
            elements: Array.from({ length }, (_, i) => i + 1),
            sorted: false
        }));

    }

    return { sortElements, reverseElements, randomizeElements, changeSorter, changeSize, details, sortSettings };
}

async function waitRender(time: number) {
    await new Promise(resolve => setTimeout(resolve, time));
}

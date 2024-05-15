import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";
import sortSettingsAtom from "../atoms/sortSettingsAtom";
import Sorter from "@/core/common/Sorter";
import elementsAtom from "../atoms/elementsAtom";
import NormalSortType from "@/core/sort-visualizer/NormalSortType";
import MemeSortType from "@/core/sort-visualizer/MemeSortType";

export default function useSortFunctions() {
    const [sortSettings, setSortSettings] = useAtom(sortSettingsAtom);
    const sorterRef = useRef<Sorter | null>(null);
    const elements = useAtomValue(elementsAtom);

    const [details, setDetails] = useState({ swap: 0, replace: 0, compare: 0, relocation: 0 });
    
    useEffect(() => {
        setSortSettings((oldSettings) => ({
            ...oldSettings,
            length: 100
        }));
    }, [setSortSettings]); 
    
    const changeSorter = async (sorter: NormalSortType | MemeSortType) => {
        setSortSettings(oldSettings => ({
            ...oldSettings,
            sortType: sorter
        }));
        if (elements === null || elements.current === null) return;
        if (sorterRef.current !== null) {
            sorterRef.current.clear();
            while (sorterRef.current !== null) await new Promise((resolve) => setTimeout(resolve, 10));
        }

        const percentage = 100 / sortSettings.length;
        for (let i = 0; i < 1000; i++) {
            const child = elements.current.children[i] as HTMLDivElement;
            child.style.background = "";
            if (i < sortSettings.length) {
                child.style.height = `${percentage * (i + 1)}%`;
                child.style.display = ""; 
                continue;
            }
            child.style.height = "";
            child.style.display = "none";
        }
    }

    const changeSize = async (length: number) => {
        setSortSettings((oldSettings) => ({
            ...oldSettings, 
            length
        }));
        if (elements === null || elements.current === null) return;
        if (sorterRef.current !== null) {
            sorterRef.current.clear();
            while (sorterRef.current !== null) await new Promise((resolve) => setTimeout(resolve, 10));
        }

        const percentage = 100 / length;
        for (let i = 0; i < 1000; i++) {
            const child = elements.current.children[i] as HTMLDivElement;
            child.style.background = "";
            if (i < length) {
                child.style.height = `${percentage * (i + 1)}%`;
                child.style.display = ""; 
                continue;
            }
            child.style.height = "";
            child.style.display = "none";
        }
    }

    const sortElements = async () => {
        if (elements === null || elements.current === null) return;
        if (sorterRef.current !== null) {
            sorterRef.current.clear();
            while (sorterRef.current !== null) await new Promise((resolve) => setTimeout(resolve, 10));
        }
        sorterRef.current = new Sorter(elements.current.children, sortSettings.length, (info) => setDetails(info));

        try {
            await sorterRef.current[sortSettings.sortType]();
            await sorterRef.current.showCorrectIfSorted();
        } catch {

        }
        sorterRef.current = null;
    }

    const randomizeElements = async () => {
        if (elements === null || elements.current === null) return;
        if (sorterRef.current !== null) {
            sorterRef.current.clear();
            while (sorterRef.current !== null) await new Promise((resolve) => setTimeout(resolve, 10));
        }
        sorterRef.current = new Sorter(elements.current.children, sortSettings.length, (info) => setDetails(info));

        try {
            await sorterRef.current.shuffle();
        } catch {
            
        }
        sorterRef.current = null;
    }

    const reverseElements = async () => {
        if (elements === null || elements.current === null) return;
        if (sorterRef.current !== null) {
            sorterRef.current.clear();
            while (sorterRef.current !== null) await new Promise((resolve) => setTimeout(resolve, 10));
        }
        sorterRef.current = new Sorter(elements.current.children, sortSettings.length, (info) => setDetails(info));

        try {
            await sorterRef.current.reverse();
        } catch {

        }
        sorterRef.current = null;
    }

    return { sortElements, reverseElements, randomizeElements, changeSorter, changeSize, details, sortSettings };
}

import SortType from "@/core/sort-visualizer/SortType";
import { atom } from "jotai";

const sortSettingsAtom = atom<{
    sortType: SortType, 
    elements: number[], 
    sorted: boolean, 
    swapIndexes: number[] | null,
    replace: { index: number, value: number } | null
}>({ 
    sortType: SortType.BubbleSort, 
    elements: Array.from({ length: 100 }, (_, i) => i + 1),
    sorted: false,
    swapIndexes: null,
    replace: null
});

export default sortSettingsAtom;

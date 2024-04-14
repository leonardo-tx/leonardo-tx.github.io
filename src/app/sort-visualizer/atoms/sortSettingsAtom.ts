import SortType from "@/core/sort-visualizer/SortType";
import { atom } from "jotai";

const sortSettingsAtom = atom<{
    sortType: SortType, 
    elements: number[], 
    sortedIndex: number | null, 
    swapIndex: number | null, 
}>({ 
    sortType: SortType.BubbleSort, 
    elements: Array.from({ length: 100 }, (_, i) => i + 1),
    sortedIndex: null,
    swapIndex: null,
});

export default sortSettingsAtom;

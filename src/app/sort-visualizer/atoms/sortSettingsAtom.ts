import SortType from "@/core/sort-visualizer/SortType";
import { atom } from "jotai";

const sortSettingsAtom = atom<{
    sortType: SortType,  
    isSorting: boolean,
    length: number,
}>({ 
    sortType: SortType.BubbleSort, 
    length: 100, 
    isSorting: false,
});

export default sortSettingsAtom;

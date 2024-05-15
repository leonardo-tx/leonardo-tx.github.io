import MemeSortType from "@/core/sort-visualizer/MemeSortType";
import NormalSortType from "@/core/sort-visualizer/NormalSortType";
import { atom } from "jotai";

const sortSettingsAtom = atom<{
    sortType: MemeSortType | NormalSortType,
    length: number,
}>({ 
    sortType: NormalSortType.BubbleSort, 
    length: 100, 
});

export default sortSettingsAtom;

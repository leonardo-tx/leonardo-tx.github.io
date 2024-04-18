import { atom } from "jotai";
import { RefObject } from "react";

const elementsAtom = atom<RefObject<HTMLDivElement> | null>(null);

export default elementsAtom;

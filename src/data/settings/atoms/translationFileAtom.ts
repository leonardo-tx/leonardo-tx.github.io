import { atom } from "jotai";

const translationFileAtom = atom<any>(require(`@/lib/assets/translations/en/translations.json`));

export default translationFileAtom;
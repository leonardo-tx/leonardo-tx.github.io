import { useAtomValue } from "jotai";
import { useCallback } from "react";
import translationFileAtom from "../atoms/translationFileAtom";

export default function useTranslation() {
    const translationFile = useAtomValue(translationFileAtom);

    const t = useCallback((key: string, ...args: any[]) => {
        return getTranslation(translationFile, key, args);
    }, [translationFile]);

    return { t };
}

const getTranslation = (translationFile: any, key: string, args: any[]): string => {
    const splitedKey = key.split('.');

    let value = translationFile;
    splitedKey.forEach((splitKey) => {
        if (value === undefined) return;
        value = value[splitKey]
    });

    return formatString(value, args); 
}

const formatString = (template: string | undefined, args: any[]): string => {
    if (template === undefined) return "";
    
    let str = template;
    for (let i = 0; i < args.length; i++) {
        str = str.replace(`{${i}}`, args[i]);
    }
    return str;
}

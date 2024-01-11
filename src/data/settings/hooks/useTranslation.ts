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

const getTranslation = (translationFile: any, key: string, ...args: any[]): string => {
    const splitedKey = key.split('.');
    
    let value = translationFile;
    splitedKey.forEach((splitKey) => {
        if (value === undefined) return;
        value = value[splitKey]
    });

    return (args.length === 0 ? value : formatString(value, args)) ?? ""; 
}

const formatString = (template: string | undefined, ...args: any[]): string => {
    if (template === undefined) return "";

    return template.replace(/{([0-9]+)}/g, (match, index) => {
        return typeof args[index] === 'undefined' ? match : args[index];
    });
}
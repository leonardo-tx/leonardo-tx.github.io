"use client";

import settingsAtom from "@/data/settings/atoms/settingsAtom";
import useTranslation from "@/data/settings/hooks/useTranslation";
import { useAtom, useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import { JSX, ReactNode, useEffect, useState } from "react";
import * as languageStorage from "@/data/settings/storage/language-storage";
import translationFileAtom from "@/data/settings/atoms/translationFileAtom";

interface Props {
    children?: ReactNode;
}

export default function SettingsProvider({ children }: Props): JSX.Element {
    const { t } = useTranslation();
    const [settings, setSettings] = useAtom(settingsAtom);
    const pathname = usePathname();
    const [show, setShow] = useState(false);
    const setTranslationFile = useSetAtom(translationFileAtom);

    useEffect(() => {
        setSettings(() => {
            setShow(true);
            return { langCode: languageStorage.getLangCode() };
        });
    }, [setSettings])

    useEffect(() => {
        if (!show) return;
        document.documentElement.lang = settings.langCode;

        const englishFile = require(`@/lib/assets/translations/en/translations.json`);
        if (settings.langCode === "en" || settings.langCode === "undefined") {
            setTranslationFile(englishFile);
            return;
        }
        const choosedLanguageFile = require(`@/lib/assets/translations/${settings.langCode}/translations.json`);
        const merged = mergeDeep(englishFile, choosedLanguageFile);

        setTranslationFile(merged);
    }, [settings.langCode, setTranslationFile, show])

    useEffect(() => {
        if (!show) return;

        const formattedPathName = pathname === '/' ? "home" : pathname.slice(1).replace('/', '-');
        document.title = `${t(`titles.${formattedPathName}`)} - ${t("author.name")}`;
    }, [t, pathname, show])

    return (
        <>
            {show && children}
        </>
    );
}

function mergeDeep(...objects: any[]): any {
    const isObject = (obj: any) => obj && typeof obj === 'object';
    
    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];
            
            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            }
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });
        
        return prev;
    }, {});
  }
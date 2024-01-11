"use client";

import { ChangeEventHandler, JSX, useCallback } from "react";
import styles from "./styles/Settings.module.css";
import useTranslation from "@/data/settings/hooks/useTranslation";
import { Heading, Select, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import settingsAtom from "@/data/settings/atoms/settingsAtom";
import * as languageStorage from "@/data/settings/storage/language-storage";
import { IoLanguage } from "react-icons/io5";

export default function Settings(): JSX.Element {
    const { t } = useTranslation();
    const [settings, setSettings] = useAtom(settingsAtom);

    const onLanguageChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        languageStorage.setLangCode(e.target.value);
        setSettings((oldSettings) => ({...oldSettings, langCode: e.target.value}));
    }, [setSettings])

    return (
        <div className={styles.settings}>
            <section className={styles["settings-section"]}>
                <Heading>{t("pages.settings.change-language")}</Heading>
                <Select onChange={onLanguageChange} defaultValue={settings.langCode} icon={<IoLanguage />} maxW="500px">
                    <option value="en">English</option>
                    <option value="pt-BR">Português (BR)</option>
                    <option value="ja-JP">日本語</option>
                </Select>
                <Text maxW="400px">{t("translation-mistakes")}</Text>
            </section>
        </div>
    );
}
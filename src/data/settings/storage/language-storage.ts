import * as settingsStorage from "./settings-storage";

const key = "langCode";

const supportedLanguages = new Set<string>();

supportedLanguages.add("pt-BR");
supportedLanguages.add("en");
supportedLanguages.add("ja-JP");

export function getLangCode(): string {
    let langCode = settingsStorage.getSettingsValue(key);
    if (typeof langCode === "string") {
        if (supportedLanguages.has(langCode)) return langCode;
    } else {
        langCode = settingsStorage.defaultSettings.langCode;
    }

    const language = (langCode as string).split('-')[0];
    supportedLanguages.forEach((key) => {
        if (key.startsWith(language)) return key;
    });
    
    return "en";
}

export function setLangCode(langCode: string): boolean {
    if (!supportedLanguages.has(langCode)) return false;

    settingsStorage.setSettingsValue(key, langCode);
    return true;
}
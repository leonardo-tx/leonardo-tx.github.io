import * as settingsStorage from "./settings-storage";

const key = "langCode";

const supportedLanguages = new Set<string>();

supportedLanguages.add("pt-BR");
supportedLanguages.add("en");
supportedLanguages.add("ja-JP");

export function getLangCode(): string {
    let langCode = settingsStorage.getSettingsValue(key);
    if (typeof langCode === "string" && langCode !== "undefined" && supportedLanguages.has(langCode)) {
        return langCode;
    } else {
        langCode = navigator.language;
        if (supportedLanguages.has(langCode as string)) return langCode as string
    }

    const language = (langCode as string).split('-')[0];
    const langCodeKeys = Array.from(supportedLanguages);
    
    for (let i = 0; i < langCodeKeys.length; i++) {
        if (langCodeKeys[i].startsWith(language)) return langCodeKeys[i];
    }
    return "en";
}

export function setLangCode(langCode: string): boolean {
    if (!supportedLanguages.has(langCode)) return false;

    settingsStorage.setSettingsValue(key, langCode);
    return true;
}
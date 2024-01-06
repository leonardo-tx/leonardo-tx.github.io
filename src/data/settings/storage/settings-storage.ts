import Settings from "@/core/settings/Settings";

const storageKey = "settings";

export const defaultSettings: Settings = {
    langCode: "undefined"
}

export function getSettingsValue(key: string): unknown {
    const settings = getAllSettings();
    return settings[key];
}

export function setSettingsValue(key: string, value: any): void {
    const settings = getAllSettings();
    settings[key] = value;

    localStorage.setItem(storageKey, JSON.stringify(settings));
}

function getAllSettings(): any {
    const allSettings = localStorage.getItem(storageKey);
    if (allSettings === null) return defaultSettings;

    return JSON.parse(allSettings);
}
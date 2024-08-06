import * as settingsStorage from "./settings-storage";
import WheelspinSegment from "@/core/wheelspin/WheelspinSegment";

const key = "wheelspin";

export function getSegments(): WheelspinSegment[] {
    const rawText = settingsStorage.getSettingsValue(key);
    
    if (typeof rawText !== "string") {
        return [];
    }
    let currentNumberStr = "";
    const found: WheelspinSegment[] = [];
    
    let i = 0;
    while (i < rawText.length) {
        const c = rawText[i];
        if (c !== ',') {
            currentNumberStr += c; i += 1;
            continue;
        }
        const number = parseInt(currentNumberStr);
        currentNumberStr = ""
        i += 1
        found.push({ id: found.length, text: rawText.slice(i, number + i) })
        i += number
    }
    return found
}

export function saveSegments(segments: WheelspinSegment[]): boolean {
    let text = "";
    for (let i = 0; i < segments.length; i++) {
        text += segments[i].text.length.toString() + ',' + segments[i].text;
    }

    settingsStorage.setSettingsValue(key, text);
    return true;
}
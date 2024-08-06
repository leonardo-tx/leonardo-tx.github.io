import { useState } from "react";
import * as wheelspinStorage from "../storage/wheelspin-storage";

export default function useWheelSpin() {
    const [segments, setSegments] =  useState(wheelspinStorage.getSegments());

    const addSegment = (text: string) => {
        const newSegments = [...segments]
        if (newSegments.length === 0) {
            newSegments.push({ text: text, id: 0 });
        } else {
            newSegments.push({ text: text, id: newSegments[newSegments.length - 1].id + 1 });
        }
        setSegments(newSegments);
        wheelspinStorage.saveSegments(newSegments);
    };

    const removeSegment = (id: number) => {
        let left = 0;
        let right = segments.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const diff = segments[mid].id - id;

            if (diff === 0) {
                const newSegments = [...segments]
                newSegments.splice(mid, 1);

                setSegments(newSegments)
                wheelspinStorage.saveSegments(newSegments)
                
                return true;
            }
            if (diff < 0) {
                left = mid + 1;
                continue;
            }
            right = mid - 1;
        }
        return false;
    }

    return { segments, addSegment, removeSegment }
}
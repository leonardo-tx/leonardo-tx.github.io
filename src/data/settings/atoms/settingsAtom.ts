import Settings from "@/core/settings/Settings";
import { atom } from "jotai";
import * as settingsStorage from "../storage/settings-storage";

const settingsAtom = atom<Settings>(settingsStorage.defaultSettings);

export default settingsAtom;
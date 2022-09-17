import {atom} from "recoil";
import {GeographicalLocation} from "types/geographical-location";

export const dropLocationAtom = atom<GeographicalLocation>({
    key: "dropLocationAtom",
    default: {}
});
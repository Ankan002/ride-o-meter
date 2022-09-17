import {atom} from "recoil";
import {GeographicalLocation} from "types/geographical-location";

export const pickupLocationAtom = atom<GeographicalLocation>({
    key: "pickupLocationAtom",
    default: {}
});
import {atom} from "recoil";
import {Ride} from "types/ride";

export const currentRideAtom = atom<Ride>({
    key: "currentRideAtom",
    default: {}
});

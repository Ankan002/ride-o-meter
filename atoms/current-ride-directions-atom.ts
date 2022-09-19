import {atom} from "recoil";
import DirectionsResult = google.maps.DirectionsResult;

export const currentRideDirectionsAtom = atom<DirectionsResult | null>({
    key: "currentRideDirectionsAtom",
    default: null
});

import {atom} from "recoil";

export const googleLoadedAtom = atom<boolean>({
    key: "googleLoadedAtom",
    default: false
});

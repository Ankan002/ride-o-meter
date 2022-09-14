import {atom} from "recoil";
import {FareChart} from "types/fare-chart";

export const fareChartAtom = atom<FareChart>({
    key: "fareChartAtom",
    default: {
        perKilometerCharges: 8,
        nightCharges: 150,
        baseCabCharges: {
            autoRickshaw: 17,
            shared: 30,
            mini: 35,
            prime: 50,
            sedan: 45,
            suv: 75,
            xl: 90
        }
    }
});

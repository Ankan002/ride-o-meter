import {Cab} from "types/cab";

import hatchback from "assets/hatchback.png";
import sedan from "assets/sedan.png";
import suv from "assets/suv.png";
import taxi from "assets/taxi.png";
import autoRickshaw from "assets/tuk-tuk.png";

interface CabOption {
    id: Cab;
    image: string;
    title: string;
}

export const CabOptions: Array<CabOption> = [
    {
        id: "autoRickshaw",
        image: autoRickshaw.src,
        title: "Auto"
    },
    {
        id: "shared",
        image: taxi.src,
        title: "Shared"
    },
    {
        id: "mini",
        image: hatchback.src,
        title: "Mini"
    },
    {
        id: "sedan",
        image: sedan.src,
        title: "Sedan"
    },
    {
        id: "prime",
        image: sedan.src,
        title: "Prime"
    },
    {
        id: "suv",
        image: suv.src,
        title: "SUV"
    },
    {
        id: "xl",
        image: suv.src,
        title: "XL"
    }
];
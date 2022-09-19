import React from 'react';
import {Map} from "components/elements";
import {useRecoilValue} from "recoil";
import {GeographicalLocation} from "types/geographical-location";
import {dropLocationAtom, pickupLocationAtom} from "atoms";

const MapSection = () => {

    const pickupLocation = useRecoilValue<GeographicalLocation>(pickupLocationAtom);
    const dropLocation = useRecoilValue<GeographicalLocation>(dropLocationAtom);

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-5">
            <Map dropLocation={dropLocation} pickupLocation={pickupLocation} />
        </div>
    );
};

export default MapSection;

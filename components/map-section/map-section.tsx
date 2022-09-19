import React from 'react';
import {Map} from "components/elements";
import {useRecoilValue} from "recoil";
import {GeographicalLocation} from "types/geographical-location";
import {currentRideDirectionsAtom, dropLocationAtom, pickupLocationAtom} from "atoms";
import DirectionsResult = google.maps.DirectionsResult;

const MapSection = () => {

    const pickupLocation = useRecoilValue<GeographicalLocation>(pickupLocationAtom);
    const dropLocation = useRecoilValue<GeographicalLocation>(dropLocationAtom);
    const currentRouteDirections = useRecoilValue<DirectionsResult | null>(currentRideDirectionsAtom);

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-5 mt-5">
            <Map dropLocation={dropLocation} pickupLocation={pickupLocation} route={currentRouteDirections} />
        </div>
    );
};

export default MapSection;

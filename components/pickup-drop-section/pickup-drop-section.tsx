import React from 'react';
import {PickupDropLocationButton} from "components/modal-elements";

const PickupDropSection = () => {
    const onPickupLocationButtonClick = () => {
        console.log("P");
    };

    const onSelectCurrentLocationClick = () => {
        console.log("L");
    }

    const onDropLocationButtonClick = () => {
        console.log("D");
    };

    return (
        <div className="w-full mt-2 py-2 px-5 flex sm:flex-row flex-col items-center justify-center">
            <PickupDropLocationButton text={""} placeholder="Select pickup location" onClick={onPickupLocationButtonClick} includePickCurrentLocation={true} onPickCurrentLocationClick={onSelectCurrentLocationClick} />
            <PickupDropLocationButton text={""} placeholder="Select drop location" onClick={onDropLocationButtonClick} includePickCurrentLocation={false} />
        </div>
    );
};

export default PickupDropSection;

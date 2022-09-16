import React, {useState} from 'react';
import {PickupDropLocationButton} from "components/elements";
import {PickLocationModal} from "components/modals";

const PickupDropSection = () => {

    const [isPickPickupLocationModalOpen, setIsPickPickupLocationModalOpen] = useState<boolean>(false);
    const [isPickDropLocationModalOpen, setIsPickDropLocationModalOpen] = useState<boolean>(false);

    const onPickupLocationButtonClick = () => {
        console.log("P");
        setIsPickPickupLocationModalOpen(prev => !prev);
    };

    const onSelectCurrentLocationClick = () => {
        console.log("L");
    }

    const onDropLocationButtonClick = () => {
        setIsPickDropLocationModalOpen(prev => !prev);
    };

    return (
        <div className="w-full mt-2 py-2 px-5 flex sm:flex-row flex-col items-center justify-center">
            <PickupDropLocationButton text={""} placeholder="Select pickup location" onClick={onPickupLocationButtonClick} includePickCurrentLocation={true} onPickCurrentLocationClick={onSelectCurrentLocationClick} />

            <PickupDropLocationButton text={""} placeholder="Select drop location" onClick={onDropLocationButtonClick} includePickCurrentLocation={false} />


            <PickLocationModal isOpen={isPickPickupLocationModalOpen} setIsOpen={setIsPickPickupLocationModalOpen} title="Pick Pickup Location" />

            <PickLocationModal isOpen={isPickDropLocationModalOpen} setIsOpen={setIsPickDropLocationModalOpen} title="Pick Drop Location" />
        </div>
    );
};

export default PickupDropSection;

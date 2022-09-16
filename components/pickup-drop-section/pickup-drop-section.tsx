import React, {useCallback, useState} from 'react';
import {PickupDropLocationButton} from "components/elements";
import {PickLocationModal} from "components/modals";
import toast from "react-hot-toast";
import {geoDecode} from "helpers/location-encode-decode";

const PickupDropSection = () => {

    const [isPickPickupLocationModalOpen, setIsPickPickupLocationModalOpen] = useState<boolean>(false);
    const [isPickDropLocationModalOpen, setIsPickDropLocationModalOpen] = useState<boolean>(false);

    const onCurrentPositionCoordinatesReceived = useCallback(async(position: GeolocationPosition) => {
        const addressResponse = await geoDecode(position.coords.latitude.toString(), position.coords.longitude.toString());

        if(!addressResponse.success){
            toast.error(addressResponse.error ?? "");
            return
        }

        console.log({
            address: addressResponse.address,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, []);

    const onPickupLocationButtonClick = () => {
        setIsPickPickupLocationModalOpen(prev => !prev);
    };

    const onSelectCurrentLocationClick = () => {
        navigator.geolocation.getCurrentPosition(
            onCurrentPositionCoordinatesReceived,
            (err) => {
                toast.error(err.message);
            }
        );
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

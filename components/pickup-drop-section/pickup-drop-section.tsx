import React, {useCallback, useEffect, useState} from 'react';
import {PickupDropLocationButton} from "components/elements";
import {PickLocationModal} from "components/modals";
import toast from "react-hot-toast";
import {geoDecode} from "helpers/location-encode-decode";
import {useRecoilState} from "recoil";
import {GeographicalLocation} from "types/geographical-location";
import {pickupLocationAtom, dropLocationAtom} from "atoms";
import PlaceResult = google.maps.places.PlaceResult;
import {getDistanceTime} from "helpers/get-distance-time";

const PickupDropSection = () => {

    const [isPickPickupLocationModalOpen, setIsPickPickupLocationModalOpen] = useState<boolean>(false);
    const [isPickDropLocationModalOpen, setIsPickDropLocationModalOpen] = useState<boolean>(false);
    const [pickingCurrentAddress, setPickingCurrentAddress] = useState<boolean>(false);

    const [pickupLocation, setPickupLocation] = useRecoilState<GeographicalLocation>(pickupLocationAtom);
    const [dropLocation, setDropLocation] = useRecoilState<GeographicalLocation>(dropLocationAtom);

    const onCurrentPositionCoordinatesReceived = useCallback(async(position: GeolocationPosition) => {
        const addressResponse = await geoDecode(position.coords.latitude.toString(), position.coords.longitude.toString());

        setPickingCurrentAddress(false);
        toast.dismiss();

        if(!addressResponse.success){
            toast.error(addressResponse.error ?? "");
            return
        }

        setPickupLocation({
            address: addressResponse.address,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

        toast.success("Your current location fetched successfully...");
    }, []);

    const onPickupLocationButtonClick = () => {
        setIsPickPickupLocationModalOpen(prev => !prev);
    };

    const onSelectCurrentLocationClick = () => {
        if(pickingCurrentAddress) return;

        setPickingCurrentAddress(true);
        toast.loading("Fetching your current location hold on!!");
        navigator.geolocation.getCurrentPosition(
            onCurrentPositionCoordinatesReceived,
            (err) => {
                toast.dismiss();
                setPickingCurrentAddress(false);
                toast.error(err.message);
            }
        );
    }

    const onDropLocationButtonClick = () => {
        setIsPickDropLocationModalOpen(prev => !prev);
    };

    const onPickupLocationSelected = (location: PlaceResult | null) => {
        if(!location) return;
        const fullAddress = (`${location.name ?? ""} ${location.formatted_address ?? ""}`);

        setPickupLocation({
            address: fullAddress,
            latitude: location?.geometry?.location?.lat(),
            longitude: location?.geometry?.location?.lng()
        });

        setIsPickPickupLocationModalOpen(false);
    }

    const onDropLocationSelected = (location: PlaceResult | null) => {
        if(!location) return;
        const fullAddress = (`${location.name ?? ""} ${location.formatted_address ?? ""}`);

        setDropLocation({
            address: fullAddress,
            latitude: location?.geometry?.location?.lat(),
            longitude: location?.geometry?.location?.lng()
        });

        setIsPickDropLocationModalOpen(false);
    }

    const onPickupAndDropLocationSelected = async() => {
        if(!pickupLocation.longitude || !pickupLocation.latitude || !dropLocation.latitude || !dropLocation.longitude) return;

        const loadingToast = toast.loading("Calculating distance and estimated time");

        const response = await getDistanceTime({
            originLatitude: pickupLocation.latitude,
            originLongitude: pickupLocation.longitude,
            destinationLatitude: dropLocation.latitude,
            destinationLongitude: dropLocation.longitude
        });

        toast.dismiss(loadingToast);

        if(!response.success) {
            toast.error(response.error ?? "");
            return;
        }

        console.log(response.data);
    }

    useEffect(() => {
        if(pickupLocation.longitude && pickupLocation.latitude && dropLocation.latitude && dropLocation.longitude)
            onPickupAndDropLocationSelected()
                .catch(e => console.log(e));
    }, [pickupLocation, dropLocation]);

    return (
        <div className="w-full mt-2 py-2 px-5 flex sm:flex-row flex-col items-center justify-center">
            <PickupDropLocationButton text={pickupLocation.address ?? ""} placeholder="Select pickup location" onClick={onPickupLocationButtonClick} includePickCurrentLocation={true} onPickCurrentLocationClick={onSelectCurrentLocationClick} />

            <PickupDropLocationButton text={dropLocation.address ?? ""} placeholder="Select drop location" onClick={onDropLocationButtonClick} includePickCurrentLocation={false} />


            <PickLocationModal isOpen={isPickPickupLocationModalOpen} setIsOpen={setIsPickPickupLocationModalOpen} title="Pick Pickup Location" defaultText={pickupLocation.address ?? ""} onPlaceResultClick={onPickupLocationSelected} />

            <PickLocationModal isOpen={isPickDropLocationModalOpen} setIsOpen={setIsPickDropLocationModalOpen} title="Pick Drop Location" defaultText={dropLocation.address ?? ""} onPlaceResultClick={onDropLocationSelected} />
        </div>
    );
};

export default PickupDropSection;

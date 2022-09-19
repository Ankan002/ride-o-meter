import React, { useEffect, useState} from 'react';
import {DirectionsRenderer, GoogleMap, Marker, MarkerClusterer} from "@react-google-maps/api";
import {GeographicalLocation} from "types/geographical-location";

interface Props {
    pickupLocation: GeographicalLocation;
    dropLocation: GeographicalLocation;
}

const Map = (props: Props) => {
    const {pickupLocation, dropLocation} = props;

    const [map, setMap] = useState<google.maps.Map>();
    const [mapCenter, setMapCenter] = useState<google.maps.LatLng>(new  google.maps.LatLng(28.644800, 77.216721));

    const onLoad = (map: google.maps.Map) => {
        setMap(map);
    }

    useEffect(() => {
        if(!pickupLocation.latitude && !pickupLocation.longitude && !dropLocation.latitude && !dropLocation.longitude) return;

        if(pickupLocation.latitude && pickupLocation.longitude) {
            map?.panTo(new google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude))
            setMapCenter(new google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude));
            return;
        }

        if(dropLocation.latitude && dropLocation.longitude) {
            map?.panTo(new google.maps.LatLng(dropLocation.latitude, dropLocation.longitude))
            setMapCenter(new google.maps.LatLng(dropLocation.latitude, dropLocation.longitude))
        }
    }, [pickupLocation, dropLocation]);

    return (
        <div className="w-full flex-1 min-h-[40vh] items-center justify-center flex">
            <GoogleMap
                mapContainerStyle={{
                    width: "100%",
                    height: "60vh",
                    borderRadius: 20,
                    border: "2px solid"
                }}
                zoom={15}
                center={mapCenter}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
                onLoad={onLoad}
            >
                {
                    pickupLocation.latitude && pickupLocation.longitude && (
                        <Marker position={{
                            lat: pickupLocation.latitude,
                            lng: pickupLocation.longitude
                        }} />
                    )
                }

                {
                    dropLocation.latitude && dropLocation.longitude && (
                        <Marker position={{
                            lat: dropLocation.latitude,
                            lng: dropLocation.longitude
                        }} />
                    )
                }
            </GoogleMap>

        </div>
    );
};

export default Map;

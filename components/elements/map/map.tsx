import React, {useEffect, useState} from 'react';
import {DirectionsRenderer, GoogleMap, Marker} from "@react-google-maps/api";
import {GeographicalLocation} from "types/geographical-location";
import DirectionsResult = google.maps.DirectionsResult;

interface Props {
    pickupLocation: GeographicalLocation;
    dropLocation: GeographicalLocation;
    route: DirectionsResult | null;
}

const Map = (props: Props) => {
    const {pickupLocation, dropLocation, route} = props;

    const [map, setMap] = useState<google.maps.Map>();
    const [mapCenter, setMapCenter] = useState<google.maps.LatLng>(new google.maps.LatLng(28.644800, 77.216721));
    const [currentRoute, setCurrentRoute] = useState<google.maps.DirectionsResult>();

    const onLoad = (map: google.maps.Map) => {
        setMap(map);
    }

    useEffect(() => {
        if (!pickupLocation.latitude && !pickupLocation.longitude && !dropLocation.latitude && !dropLocation.longitude) return;

        if (pickupLocation.latitude && pickupLocation.longitude) {
            map?.panTo(new google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude))
            setMapCenter(new google.maps.LatLng(pickupLocation.latitude, pickupLocation.longitude));
            return;
        }

        if (dropLocation.latitude && dropLocation.longitude) {
            map?.panTo(new google.maps.LatLng(dropLocation.latitude, dropLocation.longitude))
            setMapCenter(new google.maps.LatLng(dropLocation.latitude, dropLocation.longitude))
        }
    }, [pickupLocation, dropLocation]);

    useEffect(() => {
        if (route) setCurrentRoute(route);
    }, [route]);

    return (
        <GoogleMap
            mapContainerStyle={{
                width: "100%",
                height: route ? "50vh" : "60vh",
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
                route ? (
                    <DirectionsRenderer
                        directions={currentRoute}
                        routeIndex={0}
                        options={{
                            polylineOptions: {
                                strokeColor: "#FC5830",
                                strokeWeight: 5
                            }
                        }}
                    />
                ) : (
                    <>
                        {
                            pickupLocation.latitude && pickupLocation.longitude && (
                                <Marker position={{
                                    lat: pickupLocation.latitude,
                                    lng: pickupLocation.longitude
                                }}/>
                            )
                        }

                        {
                            dropLocation.latitude && dropLocation.longitude && (
                                <Marker position={{
                                    lat: dropLocation.latitude,
                                    lng: dropLocation.longitude
                                }}/>
                            )
                        }
                    </>
                )
            }
        </GoogleMap>
    );
};

export default Map;

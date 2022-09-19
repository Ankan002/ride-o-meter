interface Payload {
    originLatitude: number;
    originLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
}

export const getRoute = async(payload: Payload) => {
    const {originLatitude, originLongitude, destinationLatitude, destinationLongitude} = payload;

    const directionService = new google.maps.DirectionsService();

    try {
        const directionResponse = await directionService.route({
            origin: { lat: originLatitude, lng: originLongitude },
            destination: { lat: destinationLatitude, lng: destinationLongitude },
            travelMode: google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false,
        });

        return {
            success: true,
            directions: directionResponse,
            distance: directionResponse.routes[0]?.legs[0]?.distance?.value,
            time: directionResponse.routes[0]?.legs[0]?.duration?.value,
        };
    }
    catch(error){
        if(error instanceof Error){
            return {
                success: false,
                error: error.message
            };
        }

        return {
            success: false,
            error: "Internal Server Error"
        };
    }
}
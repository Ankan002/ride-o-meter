interface Payload {
    originLatitude: number;
    originLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
}

export const getDistanceTime = async(payload: Payload) => {
    const {originLatitude, originLongitude, destinationLatitude, destinationLongitude} = payload;
    const distanceMatrixService = new google.maps.DistanceMatrixService();

    try {
        const response = await distanceMatrixService.getDistanceMatrix({
            origins: [{ lat: originLatitude, lng: originLongitude }],
            destinations: [{ lat: destinationLatitude, lng: destinationLongitude }],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false,
        });

        return {
            success: true,
            data: {
                distanceInMeters: response?.rows[0]?.elements[0].distance.value,
                estimatedTimeInSeconds: response?.rows[0]?.elements[0].duration.value
            }
        };
    }
    catch (error){
       if(error instanceof Error){
           return {
               success: false,
               error: error.message
           };
       }

       return {
           success: false,
           error: "Internal Server Error"
       }
    }
};
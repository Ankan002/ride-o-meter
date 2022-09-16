import Geocode from "react-geocode";

export const geoDecode = async (latitude: string, longitude: string) => {
    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "");

    try{
        const location = await Geocode.fromLatLng(latitude, longitude);

        return {
            success: true,
            address: location?.results[0]?.formatted_address
        };
    }
    catch (e) {
        if(e instanceof Error){
            return {
                success: false,
                error: e.message
            };
        }

        return {
            success: false,
            error: "Internal Server Error"
        };
    }
};
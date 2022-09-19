import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import Modal from "react-modal";
import {ModalHeader} from "components/modal-elements";
import PlaceResult = google.maps.places.PlaceResult;
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import PlacesServiceStatus = google.maps.places.PlacesServiceStatus;

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    defaultText: string;
    onPlaceResultClick: (place: PlaceResult | null, status: PlacesServiceStatus) => void;
}

const PickLocationModal = (props: Props) => {
    const {isOpen, setIsOpen, title, defaultText, onPlaceResultClick} = props;

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const [placeName, setPlaceName] = useState<string>("");
    const [placeSearchResults, setPlaceSearchResults] = useState<Array<AutocompletePrediction>>([]);

    const isLoaded = useRef<boolean>(false);

    const {
        placesService,
        placePredictions,
        getPlacePredictions,
    } = usePlacesService({
        debounce: 500
    });

    const onCloseRequested = () => {
        if(isFetching) return;

        setIsOpen(false);
    }

    const getClickedPlaceDetails = async (placePredicted: AutocompletePrediction) => {
        setPlaceName(placePredicted.description);
        placesService?.getDetails({
            placeId: placePredicted.place_id,
            fields: ["formatted_address", "geometry", "name"]
        }, onPlaceResultClick);
    }

    useEffect(() => {
        if(defaultText) setPlaceName(defaultText);
    },[defaultText])

    useEffect(() => {
        if(!isLoaded.current){
            isLoaded.current = true;
            return;
        }

        if (placePredictions.length) setPlaceSearchResults(placePredictions)

    }, [placePredictions]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseRequested}
            ariaHideApp={false}
            className="w-full h-screen flex flex-col justify-end items-center"
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                }
            }}
            closeTimeoutMS={500}
        >
            <div className="w-full h-[90vh] overflow-y-scroll bg-primaryLight border-l-2 border-r-2 border-t-2 border-l-primaryDark border-r-primaryDark border-t-primaryDark flex flex-col rounded-t-lg z-10 px-5 py-2 items-start">
                <ModalHeader title={title} onCloseRequested={onCloseRequested} />

                <input
                    className="w-full border-2 border-primaryDark rounded px-3 py-1 font-manrope tracking-wider lg:text-xl sm:text-lg text-base mt-2 focus:outline-none"
                    value={placeName}
                    onChange={(e) => {
                        setPlaceName(e.target.value);
                        if(e.target.value.length > 0) getPlacePredictions({
                            input: e.target.value,
                            types: ["establishment"],
                        })
                    }}
                    placeholder="Type places here to search"
                />

                {
                    placeSearchResults.map((result) => (
                        <div key={result.place_id} className="w-full font-manrope tracking-wider lg:text-xl sm:text-lg text-base mt-2 pb-1 border-b-2 border-b-primaryDark cursor-pointer" onClick={() => getClickedPlaceDetails(result)}>
                            {
                                result.description
                            }
                        </div>
                    ))
                }
            </div>
        </Modal>
    );
};

export default PickLocationModal;

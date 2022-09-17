import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Modal from "react-modal";
import {ModalHeader} from "components/modal-elements";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    defaultText: string;
    onPlaceResultClick: (place: PlaceResult) => void;
}

const PickLocationModal = (props: Props) => {
    const {isOpen, setIsOpen, title, defaultText, onPlaceResultClick} = props;

    const [isFetching, setIsFetching] = useState<boolean>(false);

    const onCloseRequested = () => {
        if(isFetching) return;

        setIsOpen(false);
    }

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

                <ReactGoogleAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                    onPlaceSelected={onPlaceResultClick}
                    className="w-full border-2 border-primaryDark rounded px-3 py-1 font-manrope tracking-wider lg:text-xl sm:text-lg text-base mt-2 focus:outline-none"
                    options={{
                        fields: ["formatted_address", "geometry", "name"],
                        strictBounds: false,
                        types: ["establishment"]
                    }}
                    placeholder="Type places here to search"
                    defaultValue={defaultText}
                />
            </div>
        </Modal>
    );
};

export default PickLocationModal;

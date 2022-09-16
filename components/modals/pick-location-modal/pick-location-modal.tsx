import React, {Dispatch, SetStateAction, useState} from 'react';
import Modal from "react-modal";
import {ModalHeader} from "components/modal-elements";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
}

const PickLocationModal = (props: Props) => {
    const {isOpen, setIsOpen, title} = props;

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
            </div>
        </Modal>
    );
};

export default PickLocationModal;

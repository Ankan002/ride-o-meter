import React, {Dispatch, SetStateAction} from 'react';
import Modal from "react-modal";
import {ModalHeader} from "components/modal-elements";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SettingsModal = (props: Props) => {
    const {isOpen, setIsOpen} = props;

    const onRequestedClose = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestedClose}
            ariaHideApp={false}
            className="w-full h-screen flex flex-col justify-end items-center"
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.3)",

                }
            }}
            closeTimeoutMS={500}
        >
            <div className="w-full h-[90vh] overflow-y-scroll bg-primaryLight border-l-2 border-r-2 border-t-2 border-l-primaryDark border-r-primaryDark border-t-primaryDark flex flex-col rounded-t-lg z-10 px-5 py-2">
                <ModalHeader title="Settings" onCloseRequested={onRequestedClose} />
            </div>
        </Modal>
    );
};

export default SettingsModal;

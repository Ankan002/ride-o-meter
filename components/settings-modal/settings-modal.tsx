import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import Modal from "react-modal";
import {ModalHeader, ModalNumericInput} from "components/modal-elements";
import {useRecoilState} from "recoil";
import {fareChartAtom} from "atoms";
import {FareChart} from "types/fare-chart";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SettingsModal = (props: Props) => {
    const {isOpen, setIsOpen} = props;

    const [fareChart, setFareChart] = useRecoilState<FareChart>(fareChartAtom);

    const onPerKiloMeterChargesChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFareChart(prev => {
            return {
                ...prev,
                perKilometerCharges: !e.target.value  ? 0 : parseFloat(e.target.value)
            }
        })
    }

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

                <ModalNumericInput onChange={onPerKiloMeterChargesChange} placeholder="Per Kilometer Charges" value={fareChart.perKilometerCharges} title="Per Kilometer Charges" />
            </div>
        </Modal>
    );
};

export default SettingsModal;

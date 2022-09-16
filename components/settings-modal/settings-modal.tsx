import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import Modal from "react-modal";
import {ModalHeader, ModalNumericInput} from "components/modal-elements";
import {useRecoilState} from "recoil";
import {fareChartAtom} from "atoms";
import {FareChart} from "types/fare-chart";
import {Cab} from "types/cab";

interface Props {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SettingsModal = (props: Props) => {
    const {isOpen, setIsOpen} = props;

    const [fareChart, setFareChart] = useRecoilState<FareChart>(fareChartAtom);
    const [showCabCharges, setShowCabCharges] = useState<boolean>(false);

    const onPerKiloMeterChargesChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFareChart(prev => {
            return {
                ...prev,
                perKilometerCharges: !e.target.value  ? 0 : parseFloat(e.target.value)
            }
        })
    }

    const onNightChargesChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFareChart(prev => {
            return {
                ...prev,
                nightCharges: !e.target.value  ? 0 : parseFloat(e.target.value)
            }
        })
    }

    const updateCabCharges = useCallback((charges: string | undefined, cab: Cab) => {
        setFareChart(prev => {
            const updatedChart: FareChart = {
                ...prev,
                baseCabCharges: {
                    ...prev.baseCabCharges,
                }
            };
            updatedChart.baseCabCharges[cab] = !charges ? 0 : parseFloat(charges);
            return updatedChart;
        });
    }, []);

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
            <div className="w-full h-[90vh] overflow-y-scroll bg-primaryLight border-l-2 border-r-2 border-t-2 border-l-primaryDark border-r-primaryDark border-t-primaryDark flex flex-col rounded-t-lg z-10 px-5 py-2 items-start">
                <ModalHeader title="Settings" onCloseRequested={onRequestedClose} />

                <ModalNumericInput onChange={onPerKiloMeterChargesChange} placeholder="Per Kilometer Charges" value={fareChart.perKilometerCharges} title="Per Kilometer Charges" />

                <ModalNumericInput onChange={onNightChargesChange} placeholder="Night Charges" value={fareChart.nightCharges} title="Night Charges" />

                <div className="w-full mt-3 flex items-center">
                    <input type="checkbox" checked={showCabCharges} onChange={(e) => setShowCabCharges(prev => !prev)} className="w-6 h-6 accent-primaryYellow hover:cursor-pointer" />
                    <label className="ml-2 flex-1 font-manrope font-light tracking-widest lg:text-lg sm:text-base text-base">
                        Show Base Cab Charges
                    </label>
                </div>

                {
                    showCabCharges && (
                        <>
                            <ModalNumericInput
                                onChange={(e) => {
                                    updateCabCharges(e.target.value, "shared");
                                }}
                                placeholder="Shared cab charges"
                                value={fareChart.baseCabCharges.shared}
                                title="Shared Cab Base Charges"
                            />

                            <ModalNumericInput
                                onChange={(e) => {
                                    updateCabCharges(e.target.value, "mini");
                                }}
                                placeholder="Mini cab charges"
                                value={fareChart.baseCabCharges.mini}
                                title="Mini Cab Base Charges"
                            />

                            <ModalNumericInput
                                onChange={(e) => {
                                    updateCabCharges(e.target.value, "sedan");
                                }}
                                placeholder="Sedan cab charges"
                                value={fareChart.baseCabCharges.sedan}
                                title="Sedan Cab Base Charges"
                            />

                            <ModalNumericInput
                                onChange={(e) => {
                                    updateCabCharges(e.target.value, "suv");
                                }}
                                placeholder="Suv cab charges"
                                value={fareChart.baseCabCharges.suv}
                                title="Suv Cab Base Charges"
                            />

                            <ModalNumericInput
                                onChange={(e) => {
                                    updateCabCharges(e.target.value, "prime");
                                }}
                                placeholder="Prime cab charges"
                                value={fareChart.baseCabCharges.prime}
                                title="Prime Cab Base Charges"
                            />

                            <ModalNumericInput
                                onChange={(e) => {
                                    updateCabCharges(e.target.value, "xl");
                                }}
                                placeholder="XL cab charges"
                                value={fareChart.baseCabCharges.xl}
                                title="XL Cab Base Charges"
                            />

                            <ModalNumericInput
                                onChange={(e) => {
                                    updateCabCharges(e.target.value, "autoRickshaw");
                                }}
                                placeholder="Auto Rickshaw charges"
                                value={fareChart.baseCabCharges.autoRickshaw}
                                title="Auto Rickshaw Base Charges"
                            />
                        </>
                    )
                }

            </div>
        </Modal>
    );
};

export default SettingsModal;

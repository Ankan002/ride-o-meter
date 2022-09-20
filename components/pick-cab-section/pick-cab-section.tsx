import React from 'react';
import {useRecoilState} from "recoil";
import {Ride} from "types/ride";
import {currentRideAtom} from "atoms/current-ride-atom";
import {Cab} from "types/cab";
import {CabOptions} from "constants/cab-options";
import {CabElement} from "components/elements";

const PickCabSection = () => {
    const [currentRide, setCurrentRide] = useRecoilState<Ride>(currentRideAtom);

    const onCabClick = (cabId: Cab) => {
        setCurrentRide((prev) => ({
            ...prev,
            cab: cabId
        }));
    };

    return (
        <>
            {
                currentRide.time && currentRide.distance && currentRide.cab && (
                    <div className="w-full px-5 mt-5">
                        <div className="w-full overflow-hidden overflow-x-auto flex border-2 border-primaryDark bg-white rounded-md items-center sm:px-5 py-3 sm:justify-center">
                            {
                                CabOptions.map((CabOption) => (
                                    <CabElement
                                        title={CabOption.title}
                                        cabId={CabOption.id}
                                        image={CabOption.image}
                                        currentSelectedCabId={currentRide.cab ?? "mini"}
                                        onClick={onCabClick}
                                        key={CabOption.id}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default PickCabSection;

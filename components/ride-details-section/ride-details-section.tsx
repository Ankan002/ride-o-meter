import React, {useEffect, useMemo, useRef} from 'react';
import {useRecoilValue} from "recoil";
import {Ride} from "types/ride";
import {currentRideAtom} from "atoms/current-ride-atom";
import {DetailElement} from "components/elements";
import {FareChart} from "types/fare-chart";
import {fareChartAtom} from "atoms/fare-chart-atom";
import {format} from "date-fns";

const RideDetailsSection = () => {
    const currentRideDetails = useRecoilValue<Ride>(currentRideAtom);
    const fareChart = useRecoilValue<FareChart>(fareChartAtom);

    const estimatedTime = useMemo<string>(() => {
        if(!currentRideDetails.time) return "";

        let time: string = "";

        if(currentRideDetails.time < 60) {
            time = `${currentRideDetails.time} s`;
        }
        else {
            const totalMinutes = (currentRideDetails.time) / 60;

            const hours = Math.floor(totalMinutes / 60);
            const minutes = (totalMinutes - (hours * 60)).toFixed(1);

            time += hours > 0 ? `${hours} hrs ` : "";

            time += parseFloat(minutes) > 0 ? `${minutes} mins` : "";
        }

        return time.trim();
    }, [currentRideDetails]);

    const currentCharge = useMemo<string>(() => {
        if(!currentRideDetails.cab || !currentRideDetails.distance) return "";
        let totalCharges: number = 0;

        const distanceBasedCharges = parseFloat(((currentRideDetails.distance / 1000) * fareChart.perKilometerCharges).toFixed(2));

        totalCharges += distanceBasedCharges;

        const currentHour = parseInt(format(new Date(), "H"));

        if(currentHour > 20 || currentHour < 6){
            totalCharges += fareChart.nightCharges;
        }

        totalCharges += fareChart.baseCabCharges[currentRideDetails.cab];

        return totalCharges % 2 === 0 ? `₹ ${totalCharges.toString()}` : `₹ ${totalCharges.toFixed(2).toString()}`;
    }, [currentRideDetails, fareChart]);

    return (
        <>
            {
                currentRideDetails.time && currentRideDetails.distance && currentRideDetails.cab && (
                    <div className="w-full flex justify-center items-center px-5 mt-5">
                        <div className="lg:w-2/3 sm:w-3/4 w-full px-4 py-2 border-2 border-primaryDark bg-white rounded-md flex flex-wrap md:justify-between justify-center items-center">
                            <DetailElement
                                details={`${currentRideDetails.distance < 1000 ? currentRideDetails.distance.toString() + " m" : (currentRideDetails.distance / 1000).toFixed(1) + " km"}`}
                                detailsTitle="Distance"
                            />

                            <DetailElement details={estimatedTime} detailsTitle="Estimated Time" />
                            <DetailElement details={currentCharge} detailsTitle="Estimated Cost" />
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default RideDetailsSection;

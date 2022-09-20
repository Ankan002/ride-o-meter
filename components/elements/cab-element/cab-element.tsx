import React from 'react';
import {Cab} from "types/cab";
import Image from "next/image";

interface Props {
    title: string;
    cabId: Cab;
    image: string;
    currentSelectedCabId: Cab;
    onClick: (cabId: Cab) => void;
}

const CabElement = (props: Props) => {
    const { title, cabId, image, currentSelectedCabId, onClick } = props;

    return (
        <div className="mx-6 flex flex-col max-w-[70px] items-center justify-center">
            <button
                className={`p-2 flex justify-center items-center ${currentSelectedCabId === cabId && "border-2 border-primaryDark bg-primaryYellow"} rounded-md lg:w-16 lg:h-16 sm:w-14 md:h-14 w-12 h-12`}
                onClick={() => onClick(cabId)}
            >
                <Image src={image} width={"100%"} height={"100%"} alt=""/>
            </button>

            <p className="font-manrope font-light text-primaryDark lg:text-lg sm:text-base text-xs tracking-wide text-center mt-2">
                {title}
            </p>
        </div>
    );
};

export default CabElement;

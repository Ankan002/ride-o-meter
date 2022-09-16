import React, {Dispatch, SetStateAction} from 'react';
import Image from "next/image";
import {IoIosSettings} from "react-icons/io";

interface Props {
    setIsSettingsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Navbar = (props: Props) => {
    const {setIsSettingsModalOpen} = props;

    const onSettingsButtonClick = () => {
        setIsSettingsModalOpen((prev) => !prev);
    }

    return (
        <div className="w-full py-2 px-5 flex items-center justify-between">
            <div className="flex items-center justify-center font-manrope font-light tracking-widest lg:text-2xl sm:text-xl text-lg text-primaryDark">
                <h1 className="mr-2">
                    Ride
                </h1>
                <Image src="/o-logo.svg" alt="" height={40} width={40} />
                <h1 className="ml-2">
                    Meter
                </h1>
            </div>

            <div className="flex items-center justify-center">
                <button className="p-1 border-2 border-black bg-primaryYellow rounded-md" onClick={onSettingsButtonClick}>
                    <IoIosSettings size={25} className="text-primaryDark" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;

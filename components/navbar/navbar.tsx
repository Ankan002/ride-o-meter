import React from 'react';
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="w-full py-2 px-5 flex items-center justify-between">
            <div className="flex items-center justify-center font-manrope font-thin tracking-widest lg:text-2xl sm:text-xl text-lg text-primaryDark">
                <h1 className="mr-2">
                    Ride
                </h1>
                <Image src="/o-logo.svg" alt="" height={40} width={40} />
                <h1 className="ml-2">
                    Meter
                </h1>
            </div>
        </div>
    );
};

export default Navbar;

import React, {MouseEventHandler} from 'react';
import {BiTargetLock} from "react-icons/bi";

type Props = {
    text: string;
    placeholder: string;
    onClick: MouseEventHandler<HTMLInputElement>;
    includePickCurrentLocation: boolean;
    onPickCurrentLocationClick?: MouseEventHandler<HTMLButtonElement>;
}

const PickupDropLocationButton = (props: Props) => {
    const {text, placeholder, onClick, includePickCurrentLocation, onPickCurrentLocationClick} = props;

    return (
        <div className="sm:w-1/3 w-full sm:mx-3 mx-0 my-1 flex flex-row">
            <input className="flex-1 flex px-2 py-1 border-2 rounded-md border-primaryDark/70 font-manrope tracking-wider bg-white hover:cursor-pointer text-ellipsis placeholder:text-primaryDark lg:text-xl sm:text-lg text-base focus:outline-none" placeholder={placeholder} onClick={onClick} value={text} readOnly={true} />
            {
                includePickCurrentLocation && onPickCurrentLocationClick && (
                    <button className="p-1 flex items-center justify-center border-2 border-primaryDark rounded-md bg-primaryYellow ml-1" onClick={onPickCurrentLocationClick}>
                        <BiTargetLock size={20} className="text-primaryDark" />
                    </button>
                )
            }
        </div>
    );
};

export default PickupDropLocationButton;

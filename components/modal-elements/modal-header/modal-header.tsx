import React, {MouseEventHandler} from 'react';
import {IoClose} from "react-icons/io5";

interface Props {
    title: string;
    onCloseRequested: MouseEventHandler<HTMLButtonElement>;
}

const ModalHeader = (props: Props) => {
    const { title, onCloseRequested } = props;

    return (
        <div className="w-full flex items-center justify-between">
            <h1 className="flex-1 mr-2 font-manrope md:text-2xl sm:text-xl text-lg font-light tracking-widest">
                {title}
            </h1>
            <button className="p-1 border-2 border-primaryDark bg-primaryYellow flex items-center justify-center rounded-md" onClick={onCloseRequested}>
                <IoClose size={25} className="text-primaryDark" />
            </button>
        </div>
    );
};

export default ModalHeader;

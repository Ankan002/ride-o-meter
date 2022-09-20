import React from 'react';

interface Props {
    details: string;
    detailsTitle: string;
}

const DetailElement = (props: Props) => {
    const {details, detailsTitle} = props;

    return (
        <div className="my-2 mx-3 flex flex-col items-center justify-center">
            <p className="font-manrope font-light tracking-tight lg:text-3xl sm:text-2xl text-xl text-primaryDark">
                {details}
            </p>

            <p className="mt-1 font-manrope font-semibold lg:text-lg sm:text-base text-xs tracking-widest text-primaryDark">
                {detailsTitle}
            </p>
        </div>
    );
};

export default DetailElement;

import React, {ChangeEvent} from 'react';

interface Props {
    title?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value: number;
}

const ModalNumericInput = (props: Props) => {
    const { title, onChange, placeholder, value } = props;

    return (
        <div className="w-full flex flex-col mt-2">
            {
                title && (
                    <h4 className="mt-3 font-manrope font-thin tracking-widest lg:text-lg sm:text-base text-xd">
                        {title}
                    </h4>
                )
            }
            <input onChange={onChange} placeholder={placeholder} value={value.toString()} type="number" className="appearance-none w-full border-2 border-primaryDark rounded px-3 py-1 font-manrope tracking-wider lg:text-xl sm:text-lg text-base mt-2 focus:outline-none" />
        </div>
    );
};

export default ModalNumericInput;

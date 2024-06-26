"use client"

import { useState, useRef, Fragment, useEffect } from 'react';

type PinInputProps = {
    length?: number;
    childrenI?: number;
    children?: React.ReactElement,
    ret : (ret : string, i: number) => void,
    metricType : number
}

const InputNum = ({length = 1, childrenI, children, ret, metricType}: PinInputProps) => {
  const [pin, setPin] = useState(Array(length).fill(' '));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [retValues, setRetValues] = useState(pin.map(() => '0'));

  const focusInput = (index: number, next: number) => {
    if (index < length - 1) {
        inputsRef.current[index + next]?.focus();
    } else if(index == length - 1 && next <= 0) {
        inputsRef.current[length - 2]?.focus();
    }
  };

  useEffect(() => {
    ret(retValues.join(''), metricType)
  }, [retValues]);

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const value = e.key;
    const cleanValue = value.replace(/[^0-9]/g, '');

    if (e.key == 'Backspace') {
        const newPin = [...pin];
        newPin[index] = ''
        focusInput(index, -1);
        setPin(newPin);
        const newRetValue = [...retValues];
        newRetValue[index] = '0';
        setRetValues(newRetValue)
    } else if (e.key == 'ArrowLeft'){
        focusInput(index, -1);
    } else if (e.key == 'ArrowRight'){
        focusInput(index, 1);
    } else if (cleanValue == value) {
        console.log(e.key, e.key >= '0', e.key <= '9');
        const newPin = [...pin];
        newPin[index] = e.key
        focusInput(index, 1);
        setPin(newPin);
        const newRetValues = [...retValues];
        newRetValues[index] = value;
        setRetValues(newRetValues)
    } else if (e.key == 'Tab') {
        return
    }
     else {
        e.preventDefault();
    }
  };

  return (
    <div className='flex flex-row items-center'>
        {pin.map((digit, index : number) => (
            <Fragment key={index}>
                <input className="bg-transparent outline-none caret-transparent text-h3 p-0 w-12 font-semibold text-light focus:bg-gray focus:text-light text-center rounded-sm placeholder-lightgray focus:animate-bound"
                key={index}
                type="number"
                value={digit}
                placeholder="0"
                ref={(input) => {
                    inputsRef.current[index] = input;
                }}
                onKeyDown={e => handleChange(e, index)}
                />
                {index === childrenI && children}
            </Fragment>
        ))}
    </div>
    );
};

export default InputNum;

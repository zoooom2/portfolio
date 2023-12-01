import { useState } from 'react';

interface FormInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | string
    | boolean
    | number
    | null;
}

const FormInput = (props: FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const { onChange, ...inputProps } = props;
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className='flex flex-col gap-[8px]'>
      <label
        htmlFor={props.id as string}
        className={`font-poppins ${
          props.labelColor ? props.labelColor : 'text-[#01248c]'
        }  laptop:text-[24px] tablet:text-[18px] font-medium text-[14px] capitalize`}>
        {props.id as string}
      </label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        data-focused={focused.toString()}
        className='laptop:py-[18px] tablet:py-[14px] py-[10px] max-tablet:w-4/5 bg-[#f2f4f7] rounded-[8px] w-full text-[10px] px-[16px] tablet:text-[15px] text-black'
        required
      />
    </div>
  );
};

export default FormInput;

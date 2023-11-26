import { useState } from 'react';

interface FormInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | string
    | boolean
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
        className='font-poppins text-[#01248c] text-[24px] font-medium'>
        {props.id as string}
      </label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        data-focused={focused.toString()}
        className='py-[18px] bg-[#f2f4f7] rounded-[8px] w-full text-[10px] px-[16px] tablet:text-[15px]'
        required
      />
    </div>
  );
};

export default FormInput;

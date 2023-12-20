import { useState } from 'react';
import { useAppSelector } from '../App/hooks';

interface FormInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | string
    | boolean
    | null
    | RegExp
    | number;
}

const FormInput = (props: FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const { formFieldMode } = useAppSelector((state) => state.admin);
  const { onChange, ...inputProps } = props;
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className='flex flex-col gap-[8px]'>
      {props.id && (
        <label
          htmlFor={props.id as string}
          className={`font-baz1 text-baz-black laptop:text-[20px] tablet:text-[18px] font-medium text-[14px] capitalize`}>
          {props.id as string}
        </label>
      )}
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        data-focused={focused.toString()}
        required
        readOnly={
          props.mode === 'detail'
            ? formFieldMode === 'fixed'
              ? true
              : false
            : false
        }
      />
    </div>
  );
};

export default FormInput;

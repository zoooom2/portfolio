import { useState } from 'react';
import { useAppSelector } from '../App/hooks';

type FormTextAreaProps = {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  [key: string]:
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void)
    | string
    | boolean;
};

const FormTextArea = (props: FormTextAreaProps) => {
  const [focused, setFocused] = useState(false);
  const { formFieldMode } = useAppSelector((state) => state.admin);
  const { onChange, ...inputProps } = props;
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className='flex flex-col gap-[8px]'>
      {props.label && (
        <label
          htmlFor={props.name as string}
          className='font-baz1 text-baz-black laptop:text-[20px] tablet:text-[18px] font-medium text-[14px] capitalize  '>
          {props.label as string}
        </label>
      )}
      <textarea
        {...inputProps}
        id={props.name as string}
        cols={30}
        rows={10}
        onChange={onChange}
        className='laptop:py-[18px] tablet:py-[14px] py-[10px] bg-transparent border-[1.5px] tracking-wider border-[#a2a2a2] placeholder:text-[#2a2a2a] rounded-none w-full text-[10px] px-[16px] tablet:text-[15px] text-black'
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        data-focused={focused.toString()}
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

export default FormTextArea;

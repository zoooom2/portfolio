import { useState } from 'react';

interface FormInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | string
    | boolean;
}

const FormInput = (props: FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const { onChange, ...inputProps } = props;
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <input
      {...inputProps}
      onChange={onChange}
      onBlur={handleFocus}
      onFocus={() => setFocused(true)}
      data-focused={focused.toString()}
      required
    />
  );
};

export default FormInput;

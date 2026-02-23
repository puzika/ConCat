import type { FieldError } from 'react-hook-form';
import { useState, forwardRef, type ChangeEvent, type InputHTMLAttributes } from 'react'
import { BiSolidHide as HidePassword, BiSolidShow as ShowPassword } from "react-icons/bi";
import * as S from './Input.styles'

type PasswordButtonProps = {
  clickHandler: () => void,
  hidden: boolean,
}

const PasswordButton = ({ clickHandler, hidden }: PasswordButtonProps) => {
  return (
    <S.PasswordButton data-testid="hide-btn" type="button" onClick={clickHandler}>
      { hidden ? <HidePassword /> : <ShowPassword /> }
    </S.PasswordButton>
  )
}

type InputProps = {
  error?: FieldError,
  testid?: string,
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      placeholder, 
      type, 
      onChange,
      error,
      testid,
      ...rest
    } = props;

    const [hide, setHide] = useState<boolean>(type === 'password');
    const [filled, setFilled] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setFilled(value !== "");
      
      if (onChange) onChange(e);
    }

    const inputType = type === 'password' ?
      (hide ? 'password' : 'text') :
      type;

    return (
      <S.Input data-testid={testid}>
        <S.InputLabel className={ filled ? 'filled' : '' }>{ placeholder }</S.InputLabel>
        <S.InputField
          {...rest}
          ref={ref}
          data-testid="input-field"
          onChange={handleChange}
          type={inputType}
        />
        { 
          type === 'password' && 
          <PasswordButton 
            clickHandler={() => setHide(!hide)} 
            hidden={hide} 
          /> 
        }
        {
          error && 
          <S.InputError>{error.message}</S.InputError>
        }
      </S.Input>
    )
  }
)
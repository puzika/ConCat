import { useState, type ChangeEvent } from 'react'
import { BiSolidHide as HidePassword, BiSolidShow as ShowPassword } from "react-icons/bi";
import * as S from './Input.styles'

type PasswordButtonProps = {
  clickHandler: () => void,
  hidden: boolean,
}

const PasswordButton = ({ clickHandler, hidden }: PasswordButtonProps) => {
  return (
    <S.PasswordButton type="button" onClick={clickHandler}>
      { hidden ? <HidePassword /> : <ShowPassword /> }
    </S.PasswordButton>
  )
}

type InputProps = {
  name: string,
  placeholder: string,
  inputType: 'text' | 'password',
}

export const Input = ({name, placeholder, inputType}: InputProps) => {
  const [hide, setHide] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  let fieldType = inputType;

  if (inputType === 'password') {
    fieldType = hide ? 'password' : 'text';
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value);
  }

  return (
    <S.Input>
      <S.InputLabel className={ value.trim() ? 'filled' : '' }>{ placeholder }</S.InputLabel>
      <S.InputField 
        value={value} 
        onChange={handleChange} 
        name={name} 
        type={fieldType} 
      />
      { 
        inputType === 'password' && 
        <PasswordButton 
          clickHandler={() => setHide(!hide)} 
          hidden={hide} 
        /> 
      } 
    </S.Input>
  )
}
import type { ReactNode } from 'react';
import * as S from './Button.styles';

type ButtonProps = {
  buttonType: 'submit' | 'button',
  children: ReactNode | ReactNode[],
  disabled?: boolean,
  testid?: string,
}

export const Button = ({ buttonType, children, disabled, testid }: ButtonProps) => {
  return (
    <S.Button
      disabled={disabled} 
      type={buttonType}
      data-testid={testid}
    >
      { children }
    </S.Button>
  )
}
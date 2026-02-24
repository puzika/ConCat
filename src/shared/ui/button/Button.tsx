import type { ReactNode } from 'react';
import * as S from './Button.styles';

type ButtonProps = {
  buttonType: 'submit' | 'button',
  children: ReactNode | ReactNode[],
  disabled?: boolean,
  testid?: string,
  handler?: (...args: unknown[]) => void,
}

export const Button = ({ buttonType, children, disabled, testid, handler }: ButtonProps) => {
  return (
    <S.Button
      onClick={handler}
      disabled={disabled} 
      type={buttonType}
      data-testid={testid}
    >
      { children }
    </S.Button>
  )
}
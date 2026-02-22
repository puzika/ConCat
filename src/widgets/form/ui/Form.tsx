import type { ReactNode } from 'react';
import * as S from './Form.styles';

type FormProps = {
  title: string,
  children?: ReactNode | ReactNode[],
}

export const Form = ({ title, children }: FormProps) => {
  return (
    <S.Form>
      <S.FormTitle>{ title }</S.FormTitle>
      { children }
    </S.Form>
  )
}
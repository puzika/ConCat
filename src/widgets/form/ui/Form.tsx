import type { ReactNode, SubmitEvent } from 'react';
import * as S from './Form.styles';

type FormProps = {
  submitHandler?: (e: SubmitEvent<HTMLFormElement>) => void,
  title: string,
  children?: ReactNode | ReactNode[],
}

export const Form = ({ title, submitHandler, children }: FormProps) => {
  return (
    <S.Form onSubmit={submitHandler}>
      <S.FormTitle>{ title }</S.FormTitle>
      { children }
    </S.Form>
  )
}
import { TbCat as ErrorIcon } from 'react-icons/tb';
import { Button } from '../button/Button';
import * as S from './ErrorMessage.styles';

type ErrorMessageProps = {
  message: string,
  reset?: (...args: unknown[]) => void,
}

export const ErrorMessage = ({ message, reset }: ErrorMessageProps) => {
  return (
    <S.ErrorMessage>
      <S.ErrorIcon>
        <ErrorIcon />
      </S.ErrorIcon>
      <S.ErrorText>
        { message }
      </S.ErrorText>
      <Button handler={reset} buttonType='button'>
        Try again
      </Button>
    </S.ErrorMessage>
  )
}
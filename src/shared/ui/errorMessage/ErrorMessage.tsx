import { TbCat as ErrorIcon } from 'react-icons/tb';
import { Button } from '../button/Button';
import * as S from './ErrorMessage.styles';

type ErrorMessageProps = {
  message: string,
  size?: number,
  reset?: (...args: unknown[]) => void,
}

export const ErrorMessage = ({ message, reset, size }: ErrorMessageProps) => {
  return (
    <S.ErrorMessage>
      <S.ErrorIcon $size={size ?? 2}>
        <ErrorIcon />
      </S.ErrorIcon>
      <S.ErrorText $size={size ?? 2}>
        { message }
      </S.ErrorText>
      { reset && (
        <Button handler={reset} buttonType='button'>
          Try again
        </Button>
      )}
    </S.ErrorMessage>
  )
}
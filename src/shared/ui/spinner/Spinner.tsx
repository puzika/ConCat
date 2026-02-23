import { ImSpinner9 as SpinnerIcon } from 'react-icons/im';
import * as S from './Spinner.styles';

export const Spinner = () => {
  return (
    <S.Spinner data-testid="spinner">
      <SpinnerIcon />
    </S.Spinner>
  )
}
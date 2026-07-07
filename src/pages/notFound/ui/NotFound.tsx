import * as S from './NotFound.styles';
import { ErrorMessage } from '../../../shared/ui/errorMessage/ErrorMessage';

export const NotFound = () => {
  return (
    <S.NotFound>
      <ErrorMessage 
        size={6}
        message={"Page not found"}
      />
    </S.NotFound>
  )
}
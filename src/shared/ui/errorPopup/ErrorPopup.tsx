import { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import * as S from './ErrorPopup.styles';

type ErrorPopupProps = {
  errorMessage: string | null | undefined,
}

export const ErrorPopup = ({ errorMessage }: ErrorPopupProps) => {
  const [closed, setClosed] = useState<boolean>(true);

  useEffect(() => {
    if (closed && errorMessage) setClosed(false);
  }, [errorMessage]);

  return (
    <S.ErrorPopup $closed={closed}>
      { errorMessage }
      <S.ErrorPopupBtn onClick={() => setClosed(true)}>
        <RxCross2 />
      </S.ErrorPopupBtn>
    </S.ErrorPopup>
  )
}
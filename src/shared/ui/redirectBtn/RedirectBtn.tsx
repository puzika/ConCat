import { useNavigate } from "react-router-dom";
import { GoArrowLeft as BackIcon} from 'react-icons/go';
import * as S from './RedirectBtn.styles'

type RedirectBtnProps = {
  size?: number,
}

export const RedirectBtn = ({ size }: RedirectBtnProps) => {
  const navigate = useNavigate();
  
  return (
    <S.RedirectBtn 
      onClick={() => navigate('/')}
      $size={size ?? 2.5}
    >
      <BackIcon />
    </S.RedirectBtn>
  )
}
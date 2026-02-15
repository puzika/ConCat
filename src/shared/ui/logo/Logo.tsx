import { GiCat } from 'react-icons/gi';
import * as S from './Logo.styles';

export const Logo = () => {
  return (
    <S.Logo>
      <S.LogoImg>
        <GiCat />
      </S.LogoImg>
      <S.LogoText>
        ConCat
      </S.LogoText>
    </S.Logo>
  )
}
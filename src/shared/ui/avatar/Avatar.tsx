import * as S from './Avatar.styles';

type AvatarProps = {
  image?: string,
}

export const Avatar = ({ image }: AvatarProps) => {
  return (
    <S.Avatar>
      { image && <S.AvatarImg src={ image } />}
    </S.Avatar>
  )
}
import * as S from './Avatar.styles';

type AvatarProps = {
  image?: string,
  name?: string,
}

export const Avatar = ({ image, name }: AvatarProps) => {
  const firstCharacter = name?.at(0);

  return (
    <S.Avatar>
      { image && <S.AvatarImg src={ image } />}
      { firstCharacter }
    </S.Avatar>
  )
}
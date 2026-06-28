import * as S from './Avatar.styles';

type AvatarProps = {
  image?: string,
  name?: string,
  size?: number,
}

export const Avatar = ({ image, name, size }: AvatarProps) => {
  const firstCharacter = name?.at(0);

  return (
    <S.Avatar $size={size ?? 4.5} >
      { image && <S.AvatarImg src={ image } />}
      { firstCharacter }
    </S.Avatar>
  )
}
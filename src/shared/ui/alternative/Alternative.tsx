import * as S from './Alternative.styles';
import { CustomLink } from '../customLink/CustomLink';

type AlternativeProps = {
  message: string,
  name: string,
  link: string,
}

export const Alternative = ({ message, name, link }: AlternativeProps) => {
  return (
    <S.Alternative>
      <p>{message}</p>
      <CustomLink name={name} link={link} />
    </S.Alternative>
  )
}
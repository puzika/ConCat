import * as S from './CustomLink.styles';

type CustomLinkProps = {
  name: string,
  link: string,
}

export const CustomLink = ({ name, link }: CustomLinkProps) => {
  return (
    <S.CustomLink to={link}>{ name }</S.CustomLink>
  )
}
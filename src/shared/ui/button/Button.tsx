import * as S from './Button.styles';

type ButtonProps = {
  buttonType: 'submit' | 'button',
  name: string,
}

export const Button = ({ buttonType, name }: ButtonProps) => {
  return (
    <S.Button type={buttonType}>
      { name }
    </S.Button>
  )
}
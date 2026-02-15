import * as S from './Form.styles';
import { Input } from './Input';
import { Button } from './Button';

type Field = {
  name: string,
  placeholder: string,
  inputType: 'text' | 'password',
}

type FormProps = {
  title: string,
  fields: Field[],
}

export const Form = ({ title, fields }: FormProps) => {
  return (
    <S.Form>
      <S.FormTitle>{ title }</S.FormTitle>
      {
        fields.map(props => (
          <Input
            key={crypto.randomUUID()}
            {...props}
          />
        ) )
      }
      <Button buttonType='submit' name={title} />
    </S.Form>
  )
}
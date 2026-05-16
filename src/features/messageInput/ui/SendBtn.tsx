import { IoIosSend as SendIcon } from "react-icons/io";
import * as S from './SendBtn.styles';

type SendBtnProps = {
  clickable: boolean;
}

export const SendBtn = ({ clickable }: SendBtnProps) => {
  return (
    <S.SendBtn $clickable={clickable} aria-label="send button" type="submit">
      <SendIcon />
    </S.SendBtn>
  )
}
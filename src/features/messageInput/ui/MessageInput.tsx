import { 
  type KeyboardEvent, 
  type InputEvent,
  type Dispatch,
  type SetStateAction,
  type RefObject,
  useEffect
} from 'react';
import { useAppSelector } from '../../../shared/lib/store';
import { selectMessageContent, selectMessageStatus } from '../../../entities/message/model/messageSlice';
import * as S from './MessageInput.styles';

type MessageInputProps = {
  placeholder: string,
  name: string,
  sendHandler: (msg: string) => void,
  value: string,
  setter: Dispatch<SetStateAction<string>>,
  messageRef: RefObject<HTMLParagraphElement | null>,
}

export const MessageInput = ({ name, placeholder, sendHandler, value, setter, messageRef }: MessageInputProps) => {
  const messageContent = useAppSelector(selectMessageContent);
  const messageStatus = useAppSelector(selectMessageStatus);

  useEffect(() => {
    if (!messageRef.current) return;

    messageRef.current.focus();

    if (messageStatus !== 'edit') return;

    setter(messageContent);

    messageRef.current.textContent = messageContent;
  }, [messageContent, messageStatus]);

  const handleInput = (e: InputEvent<HTMLDivElement>) => {
    const { currentTarget: input } = e;

    if (!input.innerText.trim()) {
      setter(input.textContent);
      return;
    }

    setter(input.innerText);
  }

  const handleEnterKey = (e: KeyboardEvent<HTMLParagraphElement>) => {
    if (e.shiftKey && e.key === "Enter") return;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (value.trim().length > 0) sendHandler(value);
    }
  }

  return (
    <S.Input>
      <S.Text ref={messageRef} onKeyDown={handleEnterKey} contentEditable onInput={handleInput}></S.Text>
      <S.GhostText name={name} value={value} readOnly></S.GhostText>
      {!value && <S.Placeholder>{ placeholder }</S.Placeholder>}
    </S.Input>
  )
}
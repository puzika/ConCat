import { useState, type KeyboardEvent, type InputEvent } from 'react';
import * as S from './MessageInput.styles';

type MessageInputProps = {
  placeholder: string,
  name: string,
  sendHandler: (message: string) => void,
}

export const MessageInput = ({ name, placeholder, sendHandler }: MessageInputProps) => {
  const [text, setText] = useState<string>('');

  const handleInput = (e: InputEvent<HTMLDivElement>) => {
    setText(e.currentTarget.innerText);
  }

  const handleEnterKey = (e: KeyboardEvent<HTMLParagraphElement>) => {
    if (e.shiftKey && e.key === "Enter") return;

    if (e.key === 'Enter') {
      e.preventDefault();
      sendHandler(text);
    }
  }

  return (
    <S.Input>
      <S.Text onKeyDown={handleEnterKey} contentEditable onInput={handleInput}></S.Text>
      <S.GhostText name={name} defaultValue={text} readOnly></S.GhostText>
      { !text && <S.Placeholder>{ placeholder }</S.Placeholder>}
    </S.Input>
  )
}
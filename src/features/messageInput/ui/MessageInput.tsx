import { useState, type InputEvent } from 'react';
import * as S from './MessageInput.styles';

type MessageInputProps = {
  placeholder: string,
  name: string,
}

export const MessageInput = ({ name, placeholder }: MessageInputProps) => {
  const [text, setText] = useState<string>('');

  const handleInput = (e: InputEvent<HTMLDivElement>) => {
    setText(e.currentTarget.textContent);
  }

  return (
    <S.Input>
      <S.Text contentEditable onInput={handleInput}></S.Text>
      <S.GhostText name={name} defaultValue={text} readOnly></S.GhostText>
      { !text && <S.Placeholder>{ placeholder }</S.Placeholder>}
    </S.Input>
  )
}
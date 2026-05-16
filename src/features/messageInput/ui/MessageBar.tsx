import { useState, useRef, type SubmitEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../shared/lib/store';
import { selectUserId } from '../../../entities/user';
import { useCreateMessage } from '../../../widgets/chat/api/newMessage.query';
import { AttachmentBtn } from './AttachmentBtn';
import { MessageInput } from './MessageInput';
import { SendBtn } from './SendBtn';
import { Spinner } from '../../../shared/ui/spinner/Spinner.styles';
import { type NewMessage } from '../../../widgets/chat/model/messageListSchema';
import * as S from './MessageBar.styles';

export const MessageBar = () => {
  const { chatId } = useParams();
  const { mutate, isPending, isError } = useCreateMessage(Number(chatId));
  const [text, setText] = useState<string>('');
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const userId = useAppSelector(selectUserId);

  const handleSend = (msg: string) => {
    if (!userId) return;

    const newMessage: NewMessage = {
      type: 'text',
      client_id: new Date().toISOString() + crypto.randomUUID(),
      sender_id: userId,
      chat_id: Number(chatId),
      content: msg,
    }

    mutate(newMessage);
    setText('');
    
    if (!messageRef.current) return;

    messageRef.current.innerText = '';
  }

  const handleSubmission = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend(text);
  }

  return (
    <S.MessageBar onSubmit={handleSubmission}>
      <AttachmentBtn />
      <MessageInput
        value={text}
        setter={setText}
        sendHandler={handleSend}
        placeholder='Write a message...' 
        name="message" 
        messageRef={messageRef}
      />
      <SendBtn clickable={!!text.trim()} />
      {isPending && <Spinner />}
    </S.MessageBar>
  )
}
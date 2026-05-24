import { useState, useRef, type SubmitEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../shared/lib/store';
import { useAppDispatch } from '../../../shared/lib/store';
import { setMessageState } from '../../../entities/message/model/messageSlice';
import { selectUserId } from '../../../entities/user';
import { selectMessageId, selectMessageStatus, selectMessageContent } from '../../../entities/message/model/messageSlice';
import { useCreateMessage } from '../api/newMessage.query';
import { AttachmentBtn } from './AttachmentBtn';
import { MessageInput } from './MessageInput';
import { SendBtn } from './SendBtn';
import { MessageActionBar } from './MessageActionsBar';
import { type NewMessage } from '../../../entities/message/model/messageSchema';
import * as S from './MessageBar.styles';
import { useEditMessage } from '../api/editMessage.query';

export const MessageBar = () => {
  const dispatch = useAppDispatch();
  const { chatId } = useParams();
  const { mutate: mutateCreate } = useCreateMessage(Number(chatId));
  const { mutate: mutateEdit } = useEditMessage(Number(chatId));
  const [text, setText] = useState<string>('');
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const userId = useAppSelector(selectUserId);
  const messageId = useAppSelector(selectMessageId);
  const messageStatus = useAppSelector(selectMessageStatus);
  const messageContent = useAppSelector(selectMessageContent);

  const handleSend = (msg: string) => {
    if (!userId) return;

    const newMessage: NewMessage = {
      type: 'text',
      client_id: new Date().toISOString() + crypto.randomUUID(),
      sender_id: userId,
      chat_id: Number(chatId),
      content: msg,
      parent_message_id: messageId,
    }

    if (messageId && messageStatus === 'edit') mutateEdit({ id: messageId, content: msg });
    else mutateCreate(newMessage);
    
    setText('');
    
    if (messageStatus !== 'regular') dispatch(setMessageState({
      messageStatus: 'regular',
      messageId: null,
      messageContent: '',
    }));
    
    if (!messageRef.current) return;

    messageRef.current.innerText = '';
  }

  const handleSubmission = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend(text);
  }

  return (
    <S.MessageBar>
      <MessageActionBar action={messageStatus} content={messageContent} />
      <S.MessageBarTools onSubmit={handleSubmission}>
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
      </S.MessageBarTools>
    </S.MessageBar>
  )
}
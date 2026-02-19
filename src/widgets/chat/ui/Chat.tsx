import { useRef, useState, useMemo } from 'react';
import { AttachmentBtn } from '../../../features/attachmentBtn';
import { MessageInput } from '../../../features/messageInput';
import { ScrollBtn } from '../../../features/scrollBtn';
import { SendBtn } from '../../../features/sendBtn';
import { Message } from '../../../entities/message';
import { handleScrollDown } from '../../../shared/lib/utils/handlers';
import * as S from './Chat.styles';

const ChatPanel = () => {
  return (
    <S.ChatPanel>
      <S.ChatPanelUserInfo>
        <S.ChatPanelUserName>Nanajon</S.ChatPanelUserName>
        <S.ChatPanelUserLastSeen>Last seen today at 12:37 AM</S.ChatPanelUserLastSeen>
      </S.ChatPanelUserInfo>
    </S.ChatPanel>
  )
}

const ChatWindow = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState<boolean>(false);
  const messages = useMemo(() => {
    const msgs = [];

    for (let i = 0; i < 100; i++) {
      const messageType = Math.random() < 0.5 ? 'received' : 'sent';
      const message = messageType === 'sent' ?
        'You sent a message ' + i :
        'User sent you a message ' + i;

      msgs.push(
        <Message 
          key={i} 
          messageType={messageType} 
          message={message}
          timestamp='12:30 AM'
        />
      );
    }

    return msgs;
  }, []);

  return (
    <S.ChatWindow >
      <S.ChatMessages 
        ref={scrollTargetRef}
        onScroll={handleScrollDown.bind(null, scrollTargetRef, setScrollBtnVisible)}
      >
        { messages }
      </S.ChatMessages>
      <ScrollBtn 
        direction='down'
        targetRef={scrollTargetRef}
        visible={scrollBtnVisible}
      />
    </S.ChatWindow>
  )
}

const ChatInput = () => {
  return (
    <S.ChatInputSection>
      <AttachmentBtn />
      <MessageInput placeholder='Write a message...' name="message" />
      <SendBtn clickable />
    </S.ChatInputSection>
  )
}

export const Chat = () => {
  return (
    <S.Chat>
      <ChatPanel />
      <ChatWindow />
      <ChatInput />
    </S.Chat>
  )
}
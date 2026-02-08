import { useRef, useState } from 'react';
import { ScrollBtn } from '../../../features/ui';
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

type MessageProps = {
  messageType: 'sent' | 'received',
  content: string,
}

const Message = ({ messageType, content }: MessageProps) => {
  return (
    <S.ChatMessage $messageType={messageType}>
      { content }
    </S.ChatMessage>
  )
}

const ChatWindow = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState<boolean>(false);

  const messages = [];

  for (let i = 0; i < 100; i++) {
    const messageType = Math.random() < 0.5 ? 'received' : 'sent';
    const message = messageType === 'sent' ?
      'You sent a message ' + i :
      'User sent you a message ' + i;

    messages.push(<Message key={i} messageType={messageType} content={message} />)
  }

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
    <S.ChatInputSection></S.ChatInputSection>
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
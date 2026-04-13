import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMessages } from '../../../shared/api/queries/chat.query';
import { AttachmentBtn } from '../../../features/attachmentBtn';
import { MessageInput } from '../../../features/messageInput';
import { ScrollBtn } from '../../../features/scrollBtn';
import { SendBtn } from '../../../features/sendBtn';
import { Message } from '../../../entities/message';
import { Spinner } from '../../../shared/ui/spinner/Spinner.styles';
import { handleScrollDown } from '../../../shared/lib/utils/handlers';
import { type Message as TMessage } from '../../../shared/model/messagesSchema';
import * as S from './Chat.styles';

type ChatPanelProps = {
  username?: string,
  lastSeen?: string,
  isLoading: boolean,
}

const ChatPanel = ({ isLoading, username, lastSeen }: ChatPanelProps) => {
  return (
    <S.ChatPanel>
      <S.ChatPanelUserInfo>
        <S.ChatPanelUserName>{ isLoading ? "Connecting..." : username }</S.ChatPanelUserName>
        <S.ChatPanelUserLastSeen>Last seen { isLoading ? "..." : lastSeen }</S.ChatPanelUserLastSeen>
      </S.ChatPanelUserInfo>
    </S.ChatPanel>
  )
}

type ChatWindowProps = {
  messages?: TMessage[],
  isLoading: boolean,
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState<boolean>(false);

  return (
    <S.ChatWindow >
      <S.ChatMessages 
        data-testid="chat-messages"
        ref={scrollTargetRef}
        onScroll={handleScrollDown.bind(null, scrollTargetRef, setScrollBtnVisible)}
      >
        { messages ? (
            messages.map(({ id, type, content, chat_id, sender_id }) => (
              <Message 
                key={id}
                messageType={'sent'}
                message={content}
                timestamp=''
              />
            ))
          ) : (
            <>
              <Spinner />
              <p>Loading messages...</p>
            </>
          )
        }
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
  const { chatId } = useParams();
  const { data, isLoading, isError, error } = useMessages(Number(chatId));

  console.log(isLoading, isError, data, error);

  return (
    <S.Chat>
      <ChatPanel
        isLoading={isLoading}
        username={"Nanajon"}
        lastSeen={"recently"}
      />
      <ChatWindow 
        messages={data}
        isLoading={isLoading}
      />
      <ChatInput />
    </S.Chat>
  )
}
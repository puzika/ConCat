import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../api/chat.query';
import { MessageBar } from '../../../features/messageInput';
import { ScrollBtn } from '../../../features/scrollBtn';
import { Message } from '../../../entities/message';
import { Spinner } from '../../../shared/ui/spinner/Spinner';
import { handleScrollDown } from '../../../shared/lib/utils/handlers';
import { useAppSelector } from '../../../shared/lib/store';
import { selectUserId } from '../../../entities/user';
import { useMessageStream } from '../model/useMessageStream';
import { type Message as TMessage } from '../model/messageListSchema';
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
  const userId = useAppSelector(selectUserId);
  useMessageStream();
  
  return (
    <S.ChatWindow >
      <S.ChatMessages 
        data-testid="chat-messages"
        ref={scrollTargetRef}
        onScroll={handleScrollDown.bind(null, scrollTargetRef, setScrollBtnVisible)}
      >
        { messages ? (
            messages.map(({ id, content, sender_id, created_at }) => (
              <Message 
                key={crypto.randomUUID()}
                optimistic={ id === -1 }
                messageType={sender_id === userId ? 'sent' : 'received' }
                message={content}
                timestamp={created_at}
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

export const Chat = () => {
  const { chatId } = useParams();
  const { data, isLoading, isSuccess } = useChat(Number(chatId));
  const { messages, participant_one, participant_two } = isSuccess ? data: {};
  const userName = useAppSelector(selectUserId) !== participant_one?.id ? 
    participant_one?.username : 
    participant_two?.username;

  return (
    <S.Chat>
      <ChatPanel
        isLoading={isLoading}
        username={userName}
        lastSeen={"recently"}
      />
      <ChatWindow 
        messages={messages}
        isLoading={isLoading}
      />
      <MessageBar />
    </S.Chat>
  )
}
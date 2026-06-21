import { useRef, useState, memo } from 'react';
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
import { ErrorPopup } from '../../../shared/ui/errorPopup/ErrorPopup';
import { formatTime } from '../../../shared/lib/utils/timeFormatter';
import { useOnlineStatus } from '../api/useOnlineStatus';
import { type Message as TMessage } from '../../../entities/message/model/messageSchema';
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
        <S.ChatPanelUserLastSeen>{ isLoading ? "..." : lastSeen }</S.ChatPanelUserLastSeen>
      </S.ChatPanelUserInfo>
    </S.ChatPanel>
  )
}

type ChatWindowProps = {
  messages?: TMessage[],
  isLoading: boolean,
}

const ChatWindow = memo(({ messages }: ChatWindowProps) => {
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
            messages.map(({ id, content, sender_id, created_at, modified_at, parent_message }) => (
              <Message 
                edited={created_at !== modified_at}
                key={id}
                id={id}
                optimistic={ id === -1 }
                messageType={sender_id === userId ? 'sent' : 'received' }
                message={content}
                timestamp={created_at}
                parent={parent_message}
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
})

export const Chat = () => {
  const { chatId } = useParams();
  const { data, isLoading, isSuccess, error } = useChat(Number(chatId));
  const { messages, participant_one, participant_two } = isSuccess ? data : {};
  const targetParticipant = useAppSelector(selectUserId) !== participant_one?.id ? participant_one : participant_two;
  const { username, is_online, last_seen } = targetParticipant || {};
  const formattedTime = formatTime(last_seen);
  useOnlineStatus(Number(chatId), targetParticipant?.id ?? -1);

  return (
    error ? (
      <ErrorPopup errorMessage={error.message} />
    ) : (
      <S.Chat>
        <ChatPanel
          isLoading={isLoading}
          username={username}
          lastSeen={is_online ? 'Online' : `last seen ${formattedTime || 'recently'}`}
        />
        <ChatWindow 
          messages={messages}
          isLoading={isLoading}
        />
        <MessageBar />
      </S.Chat>
    )
  )
}
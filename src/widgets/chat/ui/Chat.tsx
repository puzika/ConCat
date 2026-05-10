import { useRef, useState, type SubmitEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useChat } from '../api/chat.query';
import { useCreateMessage } from '../api/newMessage.query';
import { AttachmentBtn } from '../../../features/attachmentBtn';
import { MessageInput } from '../../../features/messageInput';
import { ScrollBtn } from '../../../features/scrollBtn';
import { SendBtn } from '../../../features/sendBtn';
import { Message } from '../../../entities/message';
import { Spinner } from '../../../shared/ui/spinner/Spinner.styles';
import { handleScrollDown } from '../../../shared/lib/utils/handlers';
import { useAppSelector } from '../../../shared/lib/store';
import { selectUserId } from '../../../entities/user';
import { type Message as TMessage, type NewMessage } from '../model/messageListSchema';
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

  return (
    <S.ChatWindow >
      <S.ChatMessages 
        data-testid="chat-messages"
        ref={scrollTargetRef}
        onScroll={handleScrollDown.bind(null, scrollTargetRef, setScrollBtnVisible)}
      >
        { messages ? (
            messages.map(({ id, type, content, sender_id, created_at }) => (
              <Message 
                key={id}
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

const ChatInput = () => {
  const { chatId } = useParams();
  const userId = useAppSelector(selectUserId);
  const { mutate } = useCreateMessage(Number(chatId));

  const handleSend = async (message: string) => {
    const newMessage: NewMessage = {
      type: 'text',
      sender_id: userId!,
      chat_id: Number(chatId),
      content: message,
    }

    mutate(newMessage);
  }

  const handleSubmission = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { target } = e;
    const formData = new FormData(target);
    const message = formData.get('message');
    
    // handleSend(message?.valueOf());
  }

  return (
    <S.ChatInputSection onSubmit={handleSubmission}>
      <AttachmentBtn />
      <MessageInput
        sendHandler={handleSend}
        placeholder='Write a message...' 
        name="message" 
      />
      <SendBtn clickable />
    </S.ChatInputSection>
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
      <ChatInput />
    </S.Chat>
  )
}
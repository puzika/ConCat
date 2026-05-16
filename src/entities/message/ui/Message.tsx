import { Spinner } from '../../../shared/ui/spinner/Spinner';
import * as S from './Message.styles';

type MessageProps = {
  message: string,
  timestamp: string,
  messageType: "sent" | "received",
  optimistic?: boolean,
}

export const Message = ({ message, messageType, timestamp, optimistic }: MessageProps) => {
  const formatedTimestamp = Intl.DateTimeFormat('en-us', { timeStyle: "short" }).format(new Date(timestamp));

  return (
    <>
      <S.Message $messageType={messageType}>
        <p>{ message }</p>
        <S.MessageTimestamp>
          { optimistic ? <Spinner /> : formatedTimestamp }
        </S.MessageTimestamp>
      </S.Message>
    </>
  )
}
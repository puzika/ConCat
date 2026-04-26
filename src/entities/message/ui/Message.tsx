import * as S from './Message.styles';

type MessageProps = {
  message: string,
  timestamp: string,
  messageType: "sent" | "received",
}

export const Message = ({ message, messageType, timestamp }: MessageProps) => {
  const formatedTimestamp = Intl.DateTimeFormat('en-us', { timeStyle: "short" }).format(new Date());

  return (
    <S.Message $messageType={messageType}>
      <p>
        { message }
      </p>
      <S.MessageTimestamp>
        { formatedTimestamp }
      </S.MessageTimestamp>
    </S.Message>
  )
}
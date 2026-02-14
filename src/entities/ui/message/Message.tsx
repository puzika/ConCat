import * as S from './Message.styles';

type MessageProps = {
  message: string,
  timestamp: string,
  messageType: "sent" | "received",
}

export const Message = ({ message, messageType, timestamp }: MessageProps) => {
  return (
    <S.Message $messageType={messageType}>
      <p>
        { message }
      </p>
      <S.MessageTimestamp>
        { timestamp }
      </S.MessageTimestamp>
    </S.Message>
  )
}
import { type MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../../shared/ui/spinner/Spinner';
import { MessageActions } from './MessageActions';
import { useMessagePopup } from './useMessagePopup';
import { useDeleteMessage } from '../api/delete.query';
import { formatDate } from '../model/dateFormatting';
import {type MessageAction } from '../model/messageActions';
import { 
  RiReplyLine, 
  RiDeleteBin6Line,
  RiEditLine
} from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import * as S from './Message.styles';

type MessageProps = {
  id: number,
  message: string,
  timestamp: string,
  messageType: "sent" | "received",
  optimistic?: boolean,
}

export const Message = ({ id, message, messageType, timestamp, optimistic }: MessageProps) => {
  const { actionsRef, showPopup } = useMessagePopup();
  const { chatId } = useParams();
  const formattedChatId = Number(chatId);
  const { mutate } = useDeleteMessage(formattedChatId);
  const formatedTimestamp = formatDate(timestamp);

  const handleRightClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const { clientX: x, clientY: y } = e;
    showPopup(x, y);
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    actionsRef.current?.hidePopover();
  }

  const actions: MessageAction[] = [
    { icon: <RiReplyLine />, desc: "Reply", actionHandler: () => mutate(id) },
    { icon: <RiEditLine />, desc: "Edit", actionHandler: () => mutate(id)},
    { icon: <MdContentCopy />, desc: "Copy", actionHandler: handleCopy},
    { icon: <RiDeleteBin6Line />, desc: "Delete", actionHandler: () => mutate(id)},
  ]

  return (
    <S.Message onContextMenu={handleRightClick} $messageType={messageType}>
      <p>{ message }</p>
      <S.MessageTimestamp>
        { optimistic ? <Spinner /> : formatedTimestamp }
      </S.MessageTimestamp>
      { messageType === 'sent' && <MessageActions actions={actions} ref={actionsRef} /> }
    </S.Message>
  )
}
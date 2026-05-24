import { type MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../shared/lib/store';
import { setMessageState } from '../model/messageSlice';
import { Spinner } from '../../../shared/ui/spinner/Spinner';
import { MessageActions } from './MessageActions';
import { useMessagePopup } from './useMessagePopup';
import { useDeleteMessage } from '../api/delete.query';
import { formatDate } from '../model/dateFormatting';
import {type MessageAction } from '../model/messageActions';
import { type Message as ParentMessage } from '../model/messageSchema';
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
  edited?: boolean,
  parent?: ParentMessage | null,
}

export const Message = ({ id, message, messageType, timestamp, optimistic, edited, parent }: MessageProps) => {
  const dispatch = useAppDispatch();
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

  const handleEdit = () => {
    dispatch(setMessageState({ 
      messageId: id,
      messageStatus: 'edit',
      messageContent: message,
    }));

    actionsRef.current?.hidePopover();
  }

  const handleReply = () => {
    dispatch(setMessageState({ 
      messageId: id,
      messageStatus: 'reply',
      messageContent: message,
    }));

    actionsRef.current?.hidePopover();
  }

  const navigateToParent = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!parent) return;

    const target = document.getElementById(`msg-${chatId}-${parent.id}`);

    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }

  const actions: MessageAction[] = [
    { icon: <RiReplyLine />, desc: "Reply", actionHandler: handleReply },
  ];

  if (messageType === 'sent') {
    actions.push({ icon: <RiEditLine />, desc: "Edit", actionHandler: handleEdit });
  }
  
  actions.push(
    { icon: <MdContentCopy />, desc: "Copy", actionHandler: handleCopy },
    { icon: <RiDeleteBin6Line />, desc: "Delete", actionHandler: () => mutate(id) },
  )

  return (
    <S.Message id={`msg-${chatId}-${id}`} onContextMenu={handleRightClick} $messageType={messageType}>
      { parent && (
        <S.MessageParent onClick={navigateToParent} $messageType={messageType}>
          <S.MessageParentSender>{ parent.sender?.username}</S.MessageParentSender>
          <p>{ parent.content }</p>
        </S.MessageParent>
      )}
      <p>{ message }</p>
      <S.MessageTimestamp>
        { edited && <span>edited</span>}
        { optimistic ? <Spinner /> : <span>{formatedTimestamp}</span> }
      </S.MessageTimestamp>
      <MessageActions actions={actions} ref={actionsRef} />
    </S.Message>
  )
}
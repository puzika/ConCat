import { type MouseEvent, useRef} from 'react';
import { Spinner } from '../../../shared/ui/spinner/Spinner';
import { MessageActions } from './MessageActions';
import * as S from './Message.styles';

type MessageProps = {
  id: number,
  message: string,
  timestamp: string,
  messageType: "sent" | "received",
  optimistic?: boolean,
}

export const Message = ({ id, message, messageType, timestamp, optimistic }: MessageProps) => {
  const actionsRef = useRef<HTMLUListElement | null>(null);
  const formatedTimestamp = Intl.DateTimeFormat('en-us', { timeStyle: "short" }).format(new Date(timestamp));

  const showPopup = (x: number, y: number) => {
    const { current: actionsList } = actionsRef;

    if (!actionsList) return;

    actionsList.showPopover();

    const { innerWidth } = window;
    const { width, height } = actionsList.getBoundingClientRect();

    const horizontalShift = x + width - innerWidth;
    const verticalShift = y - height;

    actionsList.style.top = verticalShift < 0 ? `${y - height / 2 - verticalShift}px` : `${y - height / 2}px`;
    actionsList.style.left = horizontalShift > 0 ? `${x + width / 2 - horizontalShift}px` : `${x + width / 2}px`;
  }

  const handleRightClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const { clientX: x, clientY: y } = e;

    showPopup(x, y);
  }

  return (
    <S.Message onContextMenu={handleRightClick} $messageType={messageType}>
      <p>{ message }</p>
      <S.MessageTimestamp>
        { optimistic ? <Spinner /> : formatedTimestamp }
      </S.MessageTimestamp>
      { messageType === 'sent' && <MessageActions messageId={id} ref={actionsRef} />}
    </S.Message>
  )
}
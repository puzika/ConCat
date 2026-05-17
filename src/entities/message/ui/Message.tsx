import { type MouseEvent, useRef} from 'react';
import { Spinner } from '../../../shared/ui/spinner/Spinner';
import { MessageActions } from './MessageActions';
import * as S from './Message.styles';

type MessageProps = {
  message: string,
  timestamp: string,
  messageType: "sent" | "received",
  optimistic?: boolean,
}

export const Message = ({ message, messageType, timestamp, optimistic }: MessageProps) => {
  const actionsRef = useRef<HTMLUListElement | null>(null);
  const formatedTimestamp = Intl.DateTimeFormat('en-us', { timeStyle: "short" }).format(new Date(timestamp));

  const showPopup = (x: number, y: number) => {
    const { current: actionsList } = actionsRef;

    if (!actionsList) return;

    actionsList.showPopover();

    const { innerHeight, innerWidth } = window;
    const { width, height } = actionsList.getBoundingClientRect();

    const horizontalShift = x + width / 2 - innerWidth;
    const verticalShift = y - height / 2 - innerHeight;

    actionsList.style.top = verticalShift > 0 ? `${y - verticalShift}px` : `${y - height / 2}px`;
    actionsList.style.left = horizontalShift > 0 ? `${x - horizontalShift}px` : `${x + width / 2}px`;
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
      <MessageActions ref={actionsRef} />
    </S.Message>
  )
}
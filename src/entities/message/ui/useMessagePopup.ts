import { useRef} from 'react';

export const useMessagePopup = () => {
  const actionsRef = useRef<HTMLUListElement | null>(null);

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

  return { actionsRef, showPopup };
}
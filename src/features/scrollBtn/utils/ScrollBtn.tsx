import type { RefObject } from 'react';
import { 
  IoIosArrowDown as DownArrow, 
  IoIosArrowUp as UpArrow 
} from 'react-icons/io';
import * as S from './ScrollBtn.style';

type ScrollBtn = {
  direction: 'up' | 'down',
  targetRef: RefObject<HTMLElement | null>,
  visible: boolean,
}

export const ScrollBtn = ({ direction, targetRef, visible }: ScrollBtn) => {
  const handleScrollUp = () => {
    const target = targetRef.current;
    
    target?.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }

  const handleScrollDown = () => {
    const target = targetRef.current;
    
    target?.scrollTo({ 
      top: target.scrollHeight, 
      behavior: 'smooth' 
    });
  }

  const handler = direction === 'up' ? handleScrollUp : handleScrollDown;

  return (
    <S.ScrollBtn 
      $visible={visible}
      $direction={direction} 
      aria-label={`scroll-${direction} button`}
      onClick={handler}
    >
      { 
        direction === 'up' ? (
          <UpArrow />
        ) : (
          <DownArrow />
        )
      }
    </S.ScrollBtn>
  )
}
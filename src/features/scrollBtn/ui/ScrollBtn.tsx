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
  const handleClick = () => {
    const target = targetRef.current;
    
    target?.scrollTo({ 
      top: direction === 'up' ? 0 : target.scrollHeight, 
      behavior: 'smooth' 
    });
  }

  return (
    <S.ScrollBtn 
      data-testid="scroll-btn"
      $visible={visible}
      $direction={direction} 
      aria-label={`scroll-${direction} button`}
      onClick={handleClick}
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
import { 
  IoIosArrowDown as DownArrow, 
  IoIosArrowUp as UpArrow 
} from 'react-icons/io';
import * as S from './ScrollBtn.style';

type ScrollBtn = {
  direction: 'up' | 'down',
}

export const ScrollBtn = ({ direction }: ScrollBtn) => {
  return (
    <S.ScrollBtn $direction={direction} aria-label={`scroll-${direction} button`}>
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
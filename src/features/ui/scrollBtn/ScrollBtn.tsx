import { 
  IoIosArrowDown as DownArrow, 
  IoIosArrowUp as UpArrow 
} from 'react-icons/io';
import * as S from './ScrollBtn.style';

type ScrollBtn = {
  direction: 'up' | 'down',
  target: HTMLElement | null,
}

export const ScrollBtn = ({ direction, target }: ScrollBtn) => {
  const handleScrollUp = () => {
    target?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleScrollDown = () => {
    console.log(target?.scrollHeight);
    target?.scrollTo({ top: target.scrollHeight, behavior: 'smooth' });
  }

  const handler = direction === 'up' ? handleScrollUp : handleScrollDown;

  return (
    <S.ScrollBtn 
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
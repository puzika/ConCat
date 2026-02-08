import type { 
  RefObject,
  SetStateAction,
  Dispatch 
} from "react"

export const handleScrollUp = (
  ref: RefObject<HTMLElement | null>,
  setVisible: Dispatch<SetStateAction<boolean>>
) => {
    const target = ref.current;

    if (!target) return;
    
    const height = target.offsetHeight;
    const scrolled = target.scrollTop;
    const shouldBeVisible = scrolled > height / 2;

    setVisible(shouldBeVisible);
}

export const handleScrollDown = (
  ref: RefObject<HTMLElement | null>,
  setVisible: Dispatch<SetStateAction<boolean>>
) => {
    const target = ref.current;

    if (!target) return;
    
    const height = target.offsetHeight;
    const scrolled = target.scrollTop;
    const shouldBeVisible = -scrolled > height / 2;

    setVisible(shouldBeVisible);
}
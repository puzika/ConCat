import * as S from './Overlay.styles';

type OverlayProps = {
  isShown: boolean,
  clickHandler: () => void,
}

export const Overlay = ({isShown, clickHandler}: OverlayProps) => {
  return (
    <S.Overlay $isShown={isShown} onClick={clickHandler} />
  )
}
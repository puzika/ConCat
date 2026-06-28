import styled from "styled-components";
import { vars } from "../../styles";

type OverlayState = {
  $isShown: boolean,
}

export const Overlay = styled.div<OverlayState>`
  position: fixed;
  inset: 0;
  background-color: ${vars.baseClr};
  opacity: .6;
  z-index: 100;
  transition: all .3s;

  ${({$isShown}) => !$isShown && `
    opacity: 0;
    visibility: hidden;
    z-index: -1;
  `};
`;
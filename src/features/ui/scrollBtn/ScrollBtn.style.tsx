import styled, { css } from "styled-components";
import { vars } from "../../../shared/styles";

type ScrollBtnStyles = {
  $direction: 'up' | 'down',
  $visible: boolean,
}

export const ScrollBtn = styled.button<ScrollBtnStyles>`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 5rem;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.8rem;
  border-radius: 50%;
  background-color: ${vars.primaryClrLtr};
  transition: all .2s;
  cursor: pointer;

  ${props => props.$direction === 'up' ?
    css`padding-bottom: .2rem` :
    css`padding-top: .2rem`
  }; 

  ${props => props.$visible ?
    css`
      translate: 0;
      visibility: visible;
      opacity: 1;
    ` :
    css`
      translate: 0 100%;
      visibility: hidden;
      opacity: 0;
    `
  };

  &:hover {
    background-color: ${vars.secondaryClr}
  }
`
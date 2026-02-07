import styled, { css } from "styled-components";
import { vars } from "../../../shared/styles";

export const ScrollBtn = styled.button<{ $direction: 'up' | 'down' }>`
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
  transition: background-color .2s;
  cursor: pointer;

  ${props => props.$direction === 'up' ?
    css`padding-bottom: .2rem` :
    css`padding-top: .2rem`
  }; 

  &:hover {
    background-color: ${vars.secondaryClr}
  }
`
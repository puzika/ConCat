import styled, { css } from "styled-components";
import { vars } from "../../../shared/styles";

export const SendBtn = styled.button<{ $clickable: boolean }>`
  background-color: transparent;
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${vars.primaryClrLtr};
  font-size: 3rem;
  padding: 0 1rem;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    color: ${vars.fontClrLt};
  }

  ${p => !p.$clickable && css`
    visibility: hidden;
    opacity: 0;
    font-size: 0;
    width: 0;
    pointer-events: none;
  `}
`;
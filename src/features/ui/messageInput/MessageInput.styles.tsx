import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const Input = styled.div`
  position: relative;
  min-height: inherit;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: text;
`;

export const Placeholder = styled.p`
  position: absolute;
  left: 1rem;
  top: 50%;
  translate: 0 -50%;
  color: ${vars.primaryClrLtr};
  pointer-events: none;
`

export const Text = styled.p`
  width: 100%;
  max-height: 10rem;
  overflow-y: scroll;
  overflow-x: hidden;
  word-wrap: break-word;
  outline: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @supports not selector(::-webkit-scrollbar) {
    scrollbar-width: thin;
  }
`;

export const GhostText = styled.textarea`
  display: none;
`;
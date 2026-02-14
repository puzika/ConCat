import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const Message = styled.article<{ $messageType: 'sent' | 'received'}>`
  position: relative;
  max-width: 25rem;
  padding: 1rem 1rem .5rem;
  border-radius: 1rem;
  background-color: ${p => p.$messageType === 'sent' ? vars.primaryClr : vars.primaryClrLtr};
  box-shadow: 0 0 .8rem 0 #080f17;

  &::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    translate: -50% 0;
    border-style: solid;
    border-color: transparent;
    border-color: transparent;
    border-bottom-color: ${p => p.$messageType === 'sent' ? vars.primaryClr : vars.primaryClrLtr};
    border-bottom-width: 1.2rem;
    border-left-width: .8rem;
    border-right-width: .8rem;
  }

  &::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    translate: -100% 0;
    width: 2rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: ${vars.baseClr};
    z-index: 10;
  }
`;

export const MessageTimestamp = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 1.3rem;
  color: ${vars.fontClrLt};
`;
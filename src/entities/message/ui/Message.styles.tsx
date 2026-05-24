import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const Message = styled.article<{ $messageType: 'sent' | 'received'}>`
  position: relative;
  max-width: 35rem;
  padding: 1rem 1rem .5rem;
  border-radius: 1rem;
  background-color: ${p => p.$messageType === 'sent' ? vars.primaryClrLtr : vars.primaryClr};
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
    border-bottom-color: ${p => p.$messageType === 'sent' ? vars.primaryClrLtr : vars.primaryClr};
    border-bottom-width: 1.1rem;
    border-left-width: 1rem;
    border-right-width: 1rem;
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
  gap: .5rem;
  justify-content: flex-end;
  font-size: 1.3rem;
  color: ${vars.fontClrLt};
  margin-top: .5rem;
`;

export const MessageParent = styled.a<{ $messageType: 'sent' | 'received' }>`
  display: block;
  position: relative;
  background-color: ${({$messageType}) => $messageType === 'sent' ? vars.primaryClrLt : vars.primaryClrDk };
  width: 100%;
  padding: .5rem 1.5rem;
  margin-bottom: .8rem;
  border-radius: .8rem;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: .5rem;
    background-color: ${({$messageType}) => $messageType === 'sent' ? vars.secondaryClrDk : vars.secondaryClr };
  }
`;

export const MessageParentSender = styled.span`
  font-weight: 600;
  color: ${vars.secondaryClr};
`;
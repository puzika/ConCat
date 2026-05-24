import styled, { css } from "styled-components";
import { vars } from "../../../shared/styles";

export const iconStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
`;

export const MessageActionBar = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
  background-color: ${vars.primaryClr};
`;

export const MessageActionIcon = styled.div`
  ${iconStyles};
  color: ${vars.secondaryClr};
  font-size: 3rem;
`;

export const MessageActionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-width: 0;
  flex: 1;
  padding: .8rem 0;
`

export const MessageActionType = styled.p`
  color: ${vars.secondaryClr};
  font-weight: 600;
  text-transform: capitalize;
`;

export const MessageActionText = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const MessageActionCancel = styled.button`
  ${iconStyles};
  font-size: 2rem;
  opacity: .5;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }
`;
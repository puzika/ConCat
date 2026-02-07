import styled, { css } from "styled-components";
import { vars } from "../../../shared/styles";

const ellipsis = css`
  max-width: 95%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .8rem ${vars.sidebarYPadding};
  cursor: pointer;
  transition: background-color .2s;

  &:hover {
    background-color: ${vars.primaryClrLt};
  }
`;

export const ChatItemDescription = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

export const ChatItemName = styled.p`
  font-weight: 600;
  ${ ellipsis };
`;

export const ChatItemLastMessage = styled.p`
  font-size: 1.4rem;
  color: ${vars.fontClrLt};
  ${ ellipsis };
`
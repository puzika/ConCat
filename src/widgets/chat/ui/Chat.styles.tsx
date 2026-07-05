import styled from "styled-components";
import { responsive } from "../../../shared/styles/breakpoints";
import { vars } from "../../../shared/styles";

export const Chat = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 100vh;
  overflow-x: hidden;
`;

export const ChatPanel = styled.div`
  display: flex;
  height: ${vars.panelHeight};
  background-color: ${vars.primaryClr};
  padding: ${vars.primaryPadding};
  box-shadow: 0 .2rem .8rem 0 ${vars.primaryClrDk};
  z-index: 10;
`;

export const ChatBackBtnWrapper = styled.div`
  display: none;

  ${responsive.mb`
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

export const ChatPanelUser = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const ChatPanelUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  justify-content: space-between;
`;

export const ChatPanelUserName = styled.p`
  font-weight: 600;
`;

export const ChatPanelUserLastSeen = styled.p`
  color: ${vars.fontClrLt};
  font-size: 1.3rem;
`;

export const ChatWindow = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

export const ChatMessages = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 1rem;
  padding: ${vars.primaryPadding};
  scroll-behavior: smooth;
  overflow-y: auto;
  overflow-x: hidden;

  ${ responsive.tb`
    padding-right: 1.5rem;
  `}
`;
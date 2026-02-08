import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const Chat = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 100vh;
`;

export const ChatPanel = styled.div`
  display: flex;
  height: ${vars.panelHeight};
  background-color: ${vars.primaryClr};
  padding: ${vars.primaryPadding};
`;

export const ChatPanelUserInfo = styled.div`
  display: flex;
  flex-direction: column;
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
  overflow-y: auto;
`;

export const ChatInputSection = styled.form`
  height: 5rem;
  width: 100%;
  background-color: ${vars.primaryClr};
`;

export const ChatMessage = styled.article<{ $messageType: 'sent' | 'received' }>`
  padding: 2rem;
  max-width: 50%;
  min-width: 10rem;
  border-radius: 1rem;
  background-color: ${ props => props.$messageType === 'sent' ? vars.primaryClr : vars.primaryClrLtr }
`;
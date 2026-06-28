import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const Sidebar = styled.nav`
  position: relative;
  height: 100vh;
  min-width: 30rem;
  width: 25%;
  display: flex;
  flex-direction: column;
  background-color: ${vars.primaryClr};
  border-right: .1rem solid ${vars.primaryClrDk};
  overflow: hidden;
`;

export const SidebarHeader = styled.div`
  display: flex;
  height: 5.8rem;
  align-items: center;
  gap: 1rem;
  padding: ${vars.primaryPadding};
`;

export const SidebarChatsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
`;

export const SidebarChats = styled.ul`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

export const SidebarMenuBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: transparent;
  color: ${vars.primaryClrLtr};
  font-size: 3rem;
  border: none;
  outline: none;
  padding: 0 .5rem;
  cursor: pointer;

  &:hover {
    color: ${vars.fontClrLt};
  }
`;
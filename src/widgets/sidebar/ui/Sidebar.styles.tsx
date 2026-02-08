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
  overflow: hidden;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem ${vars.sidebarYPadding};
`;

export const SidebarChats = styled.ul`
  flex: 1;
  overflow-y: auto;
`
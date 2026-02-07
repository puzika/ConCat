import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const Sidebar = styled.nav`
  height: 100vh;
  min-width: 30rem;
  width: 25%;
  background-color: ${vars.primaryClr};
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem ${vars.sidebarYPadding};
`;
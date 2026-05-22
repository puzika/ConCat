import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const MessageBar = styled.div`
  background-color: ${vars.primaryClr};
  box-shadow: 0 -.2rem .8rem 0 ${vars.primaryClrDk};
  z-index: 10;
`;

export const MessageBarTools = styled.form`
  display: flex;
  align-items: flex-end;
  min-height: 5rem;
  width: 100%;
`;
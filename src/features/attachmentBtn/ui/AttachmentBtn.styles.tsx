import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const AttachmentBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: inherit;
  background-color: transparent;
  color: ${vars.primaryClrLtr};
  font-size: 2.2rem;
  padding: 0 1.2rem;
  transition: color .2s;
  cursor: pointer;

  &:hover {
    color: ${vars.fontClrLt};
  }
`;
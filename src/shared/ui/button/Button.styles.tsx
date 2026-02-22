import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: .5rem;
  background-color: ${vars.primaryClrLtr};
  transition: background-color .2s;
  cursor: pointer;

  &:hover {
    background-color: ${vars.secondaryClr};
  }
`;
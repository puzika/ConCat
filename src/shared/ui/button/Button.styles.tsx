import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  color: ${vars.fontClr};
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
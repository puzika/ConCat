import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const Actions = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  list-style: none;
  width: 20rem;
  background-color: ${vars.primaryClr};
  color: inherit;
  border: none;
  border-radius: .8rem;
  box-shadow: 0 0 .8rem ${vars.primaryClrDk};
  overflow: hidden;
`;

export const ActionsItem = styled.li`
  display: block;
`;

export const ActionsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  background-color: transparent;
  padding: 1rem 1.5rem;
  transition: background-color .2s;
  cursor: pointer;

  &:hover {
    background-color: ${vars.primaryClrLt};
  }
`;

export const ActionsIcon = styled.span`
  font-size: 2rem;
`;
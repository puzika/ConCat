import styled, { css } from "styled-components";
import { vars } from "../../../shared/styles";

const labelMinimized = css`
  top: 0;
  left: .2rem;
  translate: 0 -100%;
  font-size: 1.2rem;
`;

export const Input = styled.label`
  display: flex;
  position: relative;
  width: 100%;
  border-bottom: .1rem solid ${vars.primaryClrLt};
  transition: border-color .2s;
  cursor: text;

  &:focus-within {
    border-color: ${vars.primaryClrLtr};
  }

  &:focus-within span {
    ${labelMinimized};
  }
`;

export const InputLabel = styled.span`
  position: absolute;
  top: 50%;
  left: .5rem;
  translate: 0 -50%;
  color: ${vars.fontClrLt};
  transition: all .2s;

  &.filled {
    ${labelMinimized};
  }
`;

export const InputField = styled.input`
  flex: 1;
  padding: 1rem .5rem;
  background-color: transparent;
`;

export const PasswordButton = styled.button`
  padding: 0 .5rem;
  background-color: transparent;
  font-size: 2rem;
  color: ${vars.primaryClrLtr};
  transition: color .2s;
  cursor: pointer;

  &:hover {
    color: ${vars.secondaryClr};
  }
`;

export const InputError = styled.p`
  position: absolute;
  top: 100%;
  left: 0.2rem;
  translate: 0 .5rem;
  font-size: 1rem;
  color: ${vars.errorClr};
`;